/**
 * Раскладка диаграммы развёртывания: «квадрат в квадрате» — перенесена из прототипа
 * (`experiments/beeline-diagrams/src/layout/deployment.ts`).
 *
 * В портале эта диаграмма целиком считается на бэкенде
 * (`DiagramService.recursiveConstructDnCiIn` обходит дерево, геометрию рисует Graphviz),
 * а в TS вложенной геометрии не было: ближайший образец «коробка в коробке» — кластерный
 * рендер `GraphCanvas`. Здесь эта геометрия есть, и перенесена она один в один, чтобы
 * вид не разошёлся с прототипом.
 *
 * Дерево в графе четырёхуровневое:
 *   Environment → DeploymentNode → … → DeploymentNode → ContainerInstance
 * Окружение стоит НАД деревом и не является его частью: корневой узел может принадлежать
 * нескольким окружениям сразу, поэтому выбор окружения отбирает корни, а поддеревья едут
 * целиком.
 *
 * Алгоритм: обход в глубину, снизу вверх.
 *   - ContainerInstance — лист фиксированного размера;
 *   - DeploymentNode — сетка из своих детей, обёрнутая в рамку с заголовком;
 *   - Environment — такая же рамка над корневыми узлами вида.
 *
 * Раскладка сеточная: дети встают в колонки, выровненные по общим направляющим,
 * и центрируются в своей ячейке. Размеры дорожек берутся по максимуму в колонке —
 * иначе одна крупная вложенная рамка растягивала бы всех соседей. Верхний уровень
 * пакуется той же сеткой, а не одним рядом: у KIBANA тринадцать корневых узлов,
 * и ряд из них уходил бы на десятки тысяч пикселей.
 */

import {
    addressChars,
    addressWidth,
    BOX_ADDRESS,
    BOX_CHILD_GAP,
    BOX_COLLAPSED,
    BOX_HEADER,
    BOX_HEADER_LINE_CHARS,
    BOX_NAME_X,
    BOX_PADDING,
    BOX_TOGGLE_SLOT,
    boxHeaderHeight,
    boxHeaderMaxWidth,
    boxHeaderWidth,
    boxNameChars,
    cardHeight,
    fitLabel,
    headerIconsWidth,
    INSTANCE_H,
    INSTANCE_W,
    NODE_H,
    NODE_W,
    wrapLabel,
} from '../const';
import type {
    IDeploymentBox,
    IDeploymentCard,
    IDeploymentLayout,
    IDeploymentLayoutInput,
} from '../types';

import { type AddressPair, addressLine, pickAddresses } from './address';
import { iconById, matchTechnology, resolveTechnology } from './tech-icons';

/** Технология узла в заголовке: id иконки и её человеческое имя. */
interface INodeTechnology {
    id: string;
    label: string;
}

interface IDraftBox {
    id: string;
    name: string;
    /** Своя technology узла из графа — «k8s pod», «PostgreSQL», «RedOS 8.0.3». */
    ownTechnology: string | null;
    /** Тип узла из графа, в нижнем регистре: «k8s», «k8s-ns», «vm», «postgresql». */
    ownType: string | null;
    kind: 'environment' | 'node';
    children: IDraftBox[];
    instances: IDeploymentCard[];
    width: number;
    height: number;
    headerH: number;
    nameLines: string[];
    headerIconCount: number;
    headerIcons: number;
    addressPairs: AddressPair[];
    addresses: string[];
    addressBand: number;
    technologies: INodeTechnology[];
    cardH: number;
    /** Смещения детей относительно левого верхнего угла рамки. */
    childOffsets: Map<string, { x: number; y: number }>;
    nameX: number;
    collapsible: boolean;
    collapsed: boolean;
    nestedNodes: number;
    nestedContainers: number;
}

/** Сколько колонок брать для n детей — приём из раскладки движка диаграмм. */
const columnsFor = (n: number): number => {
    if (n <= 1) return 1;
    if (n === 2) return 2;
    return Math.ceil(Math.sqrt(n));
};

interface ICell {
    id: string;
    width: number;
    height: number;
}

interface IPacked {
    offsets: Map<string, { x: number; y: number }>;
    width: number;
    height: number;
}

/**
 * Сколько ячеек взять в каждую колонку. Набиваем до средней высоты, но цель
 * пересчитываем после каждой колонки — иначе короткая первая колонка оставляет
 * последней весь остаток: у `EAFDMMART-PROD` девятнадцать карточек разложились
 * как 3+3+3+3+7, и рамка была 666 px высотой при нужных 392.
 *
 * Цель — средняя высота на оставшиеся колонки; колонка останавливается, когда
 * добавление ячейки уводит от цели дальше, чем остановка. Пустых колонок быть
 * не должно — следим, чтобы оставшимся хватило ячеек.
 */
const splitColumns = (cells: ICell[], cols: number): ICell[][] => {
    const columns: ICell[][] = [];
    const heightOf = (from: number, count: number): number =>
        cells.slice(from, from + count).reduce((sum, cell) => sum + cell.height, 0) +
        Math.max(0, count - 1) * BOX_CHILD_GAP;

    let taken = 0;
    for (let col = 0; col < cols && taken < cells.length; col += 1) {
        const isLast = col === cols - 1;
        const remainingColumns = cols - col;
        const target = heightOf(taken, cells.length - taken) / remainingColumns;

        let size = 0;
        let height = 0;
        while (taken + size < cells.length) {
            const cell = cells[taken + size]!;
            const grown = height + (size > 0 ? BOX_CHILD_GAP : 0) + cell.height;
            const cellsLeft = cells.length - (taken + size + 1);
            if (!isLast && size > 0) {
                if (cellsLeft < remainingColumns - 1) break;
                if (Math.abs(height - target) <= Math.abs(grown - target)) break;
            }
            height = grown;
            size += 1;
        }
        columns.push(cells.slice(taken, taken + size));
        taken += size;
    }
    return columns;
};

/**
 * Сетка с набивкой колонок по высоте: ширина колонки — максимум по колонке,
 * ячейка центрируется по ней, высота рамки — максимум по колонкам.
 *
 * Ряды выравниваются по самой высокой ячейке, и рядом с высокой рамкой короткие
 * оставляли сотни пикселей пустоты: у `FDMSHOWCASEAPP` кластер 712 px растягивал
 * ряд, а две листовые рамки по 116 px центрировались в нём. Колонка выравнивает
 * только себя.
 */
const packGrid = (cells: ICell[]): IPacked => {
    const offsets = new Map<string, { x: number; y: number }>();
    if (cells.length === 0) return { offsets, width: 0, height: 0 };

    const columns = splitColumns(cells, Math.min(columnsFor(cells.length), cells.length));
    const columnHeight = (column: ICell[]): number =>
        column.reduce((sum, cell) => sum + cell.height, 0) +
        Math.max(0, column.length - 1) * BOX_CHILD_GAP;

    let x = 0;
    let height = 0;
    for (const column of columns) {
        const columnWidth = Math.max(...column.map((cell) => cell.width));
        let y = 0;
        for (const cell of column) {
            offsets.set(cell.id, { x: x + (columnWidth - cell.width) / 2, y });
            y += cell.height + BOX_CHILD_GAP;
        }
        x += columnWidth + BOX_CHILD_GAP;
        height = Math.max(height, columnHeight(column));
    }

    return { offsets, width: x - BOX_CHILD_GAP, height };
};

/**
 * Ширина рамки: хватает детям, заголовку и строке адреса — но ни имя, ни адрес
 * не растягивают её бесконечно, у обоих свой потолок.
 *
 * `icons` — ширина, отданная под иконку технологии, и она вычитается из потолка
 * имени, а не прибавляется к результату: рамка с технологией на эту ширину шире
 * ровно на столько же символов имени, то есть видимого имени у неё столько же.
 * Резерв фиксированный и от ширины не зависит, поэтому петли «ширина → место →
 * иконка → ширина» он не создаёт — ради неё ширина и считается заранее.
 */
const boxWidth = (
    childrenWidth: number,
    name: string,
    address: string,
    lines: number,
    icons = 0,
    nameX = BOX_NAME_X,
): number => {
    const header = Math.min(
        boxHeaderWidth(name.length, icons, lines, nameX),
        boxHeaderMaxWidth(icons, lines, nameX),
    );
    const addressSpace = address ? Math.min(addressWidth(address), BOX_ADDRESS.maxW) : 0;
    return Math.max(childrenWidth, header, addressSpace);
};

/** Строка адреса, обрезанная по полосе рамки; полная остаётся в `addresses`. */
const addressShortFor = (box: IDraftBox): string => {
    if (box.addresses.length === 0) return '';
    return fitLabel(addressLine(box.addresses), addressChars(box.width));
};

const techLabel = (id: string): string => iconById(id)?.label ?? id;

/**
 * Тип узла содержит «k8s» — узел сам часть кластера, а не то, что в нём развёрнуто.
 * Такой узел получает ровно одну технологию — k8s, что бы ни лежало в его
 * собственном поле technology: у 560 из 591 узла k8s-типа оно пусто, а у остальных
 * там «Kubernetes», «Namespace» или имя хоста. Подстрока, а не равенство: в графе
 * одиннадцать разных написаний (`k8s`, `k8s-ns`, `k8s-cluster`, `K8S`).
 */
const K8S_TYPE = /k8s/i;

/** Иконка k8s: показывается вместо технологии узла k8s-типа. */
const K8S_ICON = 'kubernetes';

/**
 * Технологии узла развёртывания — только свои, без агрегата по поддереву: узел
 * отвечает за себя, экземпляр — за свой контейнер (иконка карточки считается там же).
 *
 * Своя технология — это его `technology`, а если поле пусто, то его `type`:
 * у узлов стенда технология часто не заполнена, а тип говорит ровно то, что нужно
 * (`pod` → k8s, `postgresql` → PostgreSQL). Тип берём только распознанный: `vm`,
 * `bare-metal`, `external` — это таксономия, а не технология, и нейтральный глиф
 * «не распознано» на 179 таких узлах был бы шумом. Нераспознанная же своя
 * `technology` глиф получает: это поле и заведено под технологию.
 */
const ownTechnologies = (box: IDraftBox): INodeTechnology[] => {
    if (box.kind === 'environment') return [];
    if (box.ownType && K8S_TYPE.test(box.ownType)) {
        return [{ id: K8S_ICON, label: techLabel(K8S_ICON) }];
    }
    const own = resolveTechnology(box.ownTechnology) ?? matchTechnology(box.ownType);
    return own ? [{ id: own.id, label: own.label }] : [];
};

/** С какой x начинается имя: у узла со значком схлопывания она сдвинута вправо. */
const nameXOf = (box: IDraftBox): number =>
    box.collapsible ? BOX_NAME_X + BOX_TOGGLE_SLOT : BOX_NAME_X;

const layoutDraft = (box: IDraftBox, cardH: number): void => {
    /**
     * Схлопнутый узел: поддерева в раскладке уже нет (обрезано в buildDeploymentLayout),
     * поэтому размер задаётся фиксированный и packGrid не зовётся вовсе. Имя — одна
     * строка: высота рамки одна на всю диаграмму, и двухстрочный заголовок её сломал бы.
     */
    if (box.collapsed) {
        box.cardH = cardH;
        box.addresses = pickAddresses(box.addressPairs, box.name);
        box.addressBand = BOX_ADDRESS.h;
        // Своих иконок у схлопнутого узла нет: в 180 px заголовка им не место,
        // а технология скрытого поддерева — не то, что стоит показывать.
        box.technologies = [];
        box.headerIconCount = 0;
        box.headerIcons = 0;
        box.headerH = boxHeaderHeight(1);
        box.width = BOX_COLLAPSED.w;
        box.height = BOX_COLLAPSED.h;
        box.nameX = nameXOf(box);
        box.nameLines = wrapLabel(box.name, boxNameChars(box.width, 0, box.nameX), 1);
        return;
    }

    // Сначала считаем размеры всех вложенных рамок — обход снизу вверх.
    box.children.forEach((child) => layoutDraft(child, cardH));
    box.cardH = cardH;

    // У окружения адреса нет, как и иконок: это рамка вокруг корней, а не узел сети.
    box.addresses = box.kind === 'environment' ? [] : pickAddresses(box.addressPairs, box.name);

    // Полоса есть у каждой рамки: у узла без адреса она пустая. Так рамки одной
    // колонки одной высоты, а «адрес есть» читается по заполненности полосы.
    box.addressBand = box.kind === 'environment' ? 0 : BOX_ADDRESS.h;

    const cells: ICell[] = [
        ...box.children.map((child) => ({
            id: child.id,
            width: child.width,
            height: child.height,
        })),
        ...box.instances.map((instance) => ({ id: instance.id, width: INSTANCE_W, height: cardH })),
    ];

    const packed = packGrid(cells);

    box.technologies = ownTechnologies(box);

    // Имя переносится на две строки, если в одну при двухстрочном потолке не влезает:
    // вдвое более узкий заголовок при том же числе видимых символов.
    const lines = box.name.length <= BOX_HEADER_LINE_CHARS ? 1 : BOX_HEADER.lines;
    box.headerH = boxHeaderHeight(lines);

    // Место под иконку технологии резервируется заранее и входит в потолок имени,
    // а не отбирается у него: рамка становится на столько же шире, и видимого имени
    // остаётся столько же. Иначе у длинного имени (FQDN в 70 символов) знак не влезал
    // бы вовсе — так терялось 47 иконок из 50.
    const iconReserve = headerIconsWidth(box.technologies.length > 0 ? 1 : 0);

    box.nameX = nameXOf(box);
    box.width = boxWidth(
        packed.width + BOX_PADDING * 2,
        box.name,
        addressLine(box.addresses),
        lines,
        iconReserve,
        box.nameX,
    );
    box.nameLines = wrapLabel(box.name, boxNameChars(box.width, iconReserve, box.nameX), lines);

    // Своя технология у узла одна, сворачивать в счётчик нечего, а место под неё
    // уже зарезервировано — значит, знак рисуется всегда, когда технология есть.
    box.headerIconCount = box.technologies.length > 0 ? 1 : 0;
    box.headerIcons = iconReserve;

    box.height = packed.height + BOX_PADDING * 2 + box.headerH + box.addressBand;

    // Смещения детей — от содержимого рамки: отступ, заголовок и полоса адреса.
    const contentY = BOX_PADDING + box.headerH + box.addressBand;
    for (const child of [...box.children, ...box.instances]) {
        const offset = packed.offsets.get(child.id) ?? { x: 0, y: 0 };
        box.childOffsets.set(child.id, { x: BOX_PADDING + offset.x, y: contentY + offset.y });
    }
};

/** Переносит относительные смещения в абсолютные координаты. */
const absolutize = (box: IDraftBox, x: number, y: number): IDeploymentBox => {
    const children = box.children.map((child) => {
        const offset = box.childOffsets.get(child.id) ?? { x: 0, y: 0 };
        return absolutize(child, x + offset.x, y + offset.y);
    });

    const instanceOffsets = box.instances.map((instance) => {
        const offset = box.childOffsets.get(instance.id) ?? { x: 0, y: 0 };
        return { id: instance.id, x: x + offset.x, y: y + offset.y };
    });

    return {
        id: box.id,
        name: box.name,
        nameLines: box.nameLines,
        kind: box.kind,
        x,
        y,
        width: box.width,
        height: box.height,
        headerH: box.headerH,
        nameX: box.nameX,
        technologies: box.technologies,
        headerIconCount: box.headerIconCount,
        headerIcons: box.headerIcons,
        addresses: box.addresses,
        addressShort: addressShortFor(box),
        addressBand: box.addressBand,
        cardH: box.cardH,
        collapsible: box.collapsible,
        collapsed: box.collapsed,
        nestedNodes: box.nestedNodes,
        nestedContainers: box.nestedContainers,
        children,
        instances: box.instances,
        instanceOffsets,
    };
};

/** Заготовка рамки: поля, которые считает layoutDraft, заполняются заглушками. */
const draftBox = (
    init: Partial<IDraftBox> & Pick<IDraftBox, 'id' | 'name' | 'kind'>,
): IDraftBox => ({
    ownTechnology: null,
    ownType: null,
    children: [],
    instances: [],
    width: NODE_W,
    height: NODE_H,
    headerH: 0,
    nameLines: [],
    headerIconCount: 0,
    headerIcons: 0,
    addressPairs: [],
    addresses: [],
    addressBand: 0,
    technologies: [],
    cardH: INSTANCE_H,
    childOffsets: new Map(),
    nameX: BOX_NAME_X,
    collapsible: false,
    collapsed: false,
    nestedNodes: 0,
    nestedContainers: 0,
    ...init,
});

/** Имя ребёнка для сортировки: экземпляр показывается именем контейнера. */
const instanceSortKey = (instance: IDeploymentCard): string =>
    (instance.containerName ?? instance.name).toLowerCase();

/**
 * Ключ, по которому экземпляры считаются копиями одного контейнера. Порядок важен:
 *
 * 1. `containerId` — id Container по конвенции проекта. Имя для счёта не годится:
 *    в графе есть системы, где одно видимое имя носят два разных Container
 *    (у DATAFEED «Frontend админки BACKENDISHOP» — два контейнера и три экземпляра),
 *    и счёт по имени слепил бы их в один.
 * 2. `containerName` — фолбэк для фикстур, которые `:Deploy` не знают.
 * 3. id экземпляра — последний фолбэк: без него все безымянные экземпляры
 *    схлопнулись бы в одну «копию» и получили бы общий счёт.
 *
 * Ключ намеренно с префиксом: без него id контейнера и имя могли бы случайно
 * совпасть и слиплись бы в один счётчик.
 */
const containerKeyOf = (instance: IDeploymentLayoutInput['instances'][number]): string =>
    `c:${instance.containerId ?? instance.containerName ?? instance.id}`;

export const buildDeploymentLayout = (input: IDeploymentLayoutInput): IDeploymentLayout => {
    const drafts = new Map<string, IDraftBox>();
    for (const node of input.nodes) {
        drafts.set(
            node.id,
            draftBox({
                id: node.id,
                name: node.name,
                kind: 'node',
                ownTechnology: node.technology,
                ownType: node.type?.trim() || null,
                addressPairs: node.addressPairs,
            }),
        );
    }

    // Высота карточки — одна на всю диаграмму: если url есть хоть у одной, выше
    // становятся все. Иначе карточки разъехались бы по высоте внутри одной рамки,
    // а сетка выравнивает ячейки по максимуму в колонке.
    const cardH = cardHeight(
        input.instances.some((instance) => (instance.url ?? '').trim() !== ''),
    );

    // Сколько раз каждый контейнер развёрнут на этой диаграмме. Считаем по всей
    // выборке, до разбора по рамкам: значок говорит «сколько таких на полотне»,
    // а не «сколько в этой рамке».
    const copiesByContainer = new Map<string, number>();
    for (const instance of input.instances) {
        const key = containerKeyOf(instance);
        copiesByContainer.set(key, (copiesByContainer.get(key) ?? 0) + 1);
    }

    // Экземпляры, чей родитель не попал в выборку, поднимаем в корень — иначе потеряются.
    const orphans: IDraftBox[] = [];

    for (const instance of input.instances) {
        const parent = instance.parentId ? drafts.get(instance.parentId) : undefined;
        const url = (instance.url ?? '').trim();
        const entry: IDeploymentCard = {
            id: instance.id,
            name: instance.name,
            containerName: instance.containerName ?? undefined,
            technology: instance.technology ?? undefined,
            icon: resolveTechnology(instance.technology)?.id ?? null,
            url: url === '' ? undefined : url,
            copies: copiesByContainer.get(containerKeyOf(instance)) ?? 1,
        };
        if (parent) {
            parent.instances.push(entry);
        } else {
            orphans.push(
                draftBox({
                    id: instance.id,
                    name: instance.name,
                    kind: 'node',
                    instances: [entry],
                }),
            );
        }
    }

    const roots: IDraftBox[] = [];
    for (const node of input.nodes) {
        if (node.parentId && drafts.has(node.parentId)) {
            drafts.get(node.parentId)!.children.push(drafts.get(node.id)!);
        } else {
            roots.push(drafts.get(node.id)!);
        }
    }
    roots.push(...orphans);

    // Порядок обхода графа не гарантирован, поэтому сортируем: иначе при каждом
    // обновлении данных узлы менялись бы местами в сетке.
    const sortTree = (box: IDraftBox): void => {
        box.children.sort((a, b) => a.name.localeCompare(b.name));
        box.instances.sort((a, b) => instanceSortKey(a).localeCompare(instanceSortKey(b)));
        box.children.forEach(sortTree);
    };
    roots.sort((a, b) => a.name.localeCompare(b.name));
    roots.forEach(sortTree);

    // Схлопывание: сначала считаем по ПОЛНОМУ дереву, потом обрезаем.
    // Порядок обязателен — после обрезки считать будет нечего.
    const collapsedIds = input.collapsed ?? new Set<string>();
    const prepareCollapse = (box: IDraftBox): { nodes: number; containers: number } => {
        let nodes = 0;
        let containers = box.instances.length;
        for (const child of box.children) {
            const inner = prepareCollapse(child);
            nodes += 1 + inner.nodes;
            containers += inner.containers;
        }
        box.collapsible = box.children.length > 0;
        box.nestedNodes = nodes;
        box.nestedContainers = containers;

        if (box.collapsible && collapsedIds.has(box.id)) {
            box.collapsed = true;
            // Обрезаем именно в дереве, а не только в раскладке: по box.children
            // рекурсивно ходят absolutize, dimmedBySelection, cardIdsOf,
            // rolesBySelection и карты копирования — иначе скрытые узлы продолжат
            // участвовать в приглушении, фигурах связи и в буфере обмена.
            box.children = [];
            box.instances = [];
        }
        return { nodes, containers };
    };
    roots.forEach(prepareCollapse);

    // Рамка окружения появляется только при конкретном выборе: в режиме «все» общий
    // корень пришлось бы продублировать в каждом окружении, которому он принадлежит.
    // Корни сюда приходят уже отрезанные по окружению (см. resolveEnvironments), поэтому
    // оборачиваются все — других у вида не бывает.
    const topLevel: IDraftBox[] = [];
    if (input.environment && roots.length > 0) {
        topLevel.push(
            // У окружения своей технологии нет, а агрегат по всему дереву был бы шумом.
            draftBox({
                id: `env:${input.environment}`,
                name: input.environment,
                kind: 'environment',
                children: roots,
            }),
        );
    } else {
        topLevel.push(...roots);
    }

    topLevel.forEach((box) => layoutDraft(box, cardH));

    // Верхний уровень — та же сетка, а не один ряд: у крупных систем корневых узлов
    // больше десятка, и ряд растягивался на всю ширину полотна.
    const packedTop = packGrid(
        topLevel.map((box) => ({ id: box.id, width: box.width, height: box.height })),
    );
    const boxes = topLevel.map((box) => {
        const offset = packedTop.offsets.get(box.id) ?? { x: 0, y: 0 };
        return absolutize(box, offset.x, offset.y);
    });

    return { boxes, width: packedTop.width, height: packedTop.height };
};
