/**
 * Константы диаграммы развёртывания — перенесены из прототипа
 * (`experiments/beeline-diagrams/src/lib/constants.ts`) вместе с метриками,
 * чтобы диаграмма укладывалась и читалась как там.
 *
 * Размеры карточек и шаг сетки берутся из движка диаграмм портала: там те же
 * числа, и карточка узла на соседней вкладке должна совпадать с карточкой
 * экземпляра здесь.
 */

import { GRID_CELL, NODE_H, NODE_W } from '../Diagrams/components/GraphCanvas/consts';

/** Размеры карточки и шаг сетки движка — раскладка берёт их и как размеры по умолчанию. */
export { GRID_CELL, NODE_H, NODE_W };

/** Привязка размера к сетке: в движке это `snapSizeToGrid` в `consts/dimensions.ts`. */
export const snapSizeToGrid = (px: number): number =>
    Math.max(GRID_CELL, Math.round(px / GRID_CELL) * GRID_CELL);

/** Скругление карточки — тот же порядок, что у панелей интерфейса. */
export const CARD_RADIUS = 8;

/**
 * Радиус фигуры связи: выемки слева и выпуклости справа. Фигура — деталь пазла,
 * и её размер нельзя мерить в одиночку: выпуклость выходит за правое ребро
 * карточки ровно на радиус и достаёт до всего, что стоит за зазором укладки.
 * Поэтому зазоры и отступ содержимого карточки выведены из этого радиуса.
 */
export const CARD_NOTCH_R = 18;

/** Толщина обводки карточки: обычной и у выделенной. */
export const CARD_STROKE = 1;
export const CARD_STROKE_SELECTED = 2;

/**
 * Толщина обводки фигур связи — своя, и она жирнее ребра карточки: прямую
 * в один пиксель растеризатор кладёт ровно в пиксель, а дугу размазывает
 * по двум-трём, и она сереет.
 */
export const CARD_SHAPE_STROKE = 2;

/**
 * Вылет фигуры за ребро карточки: радиус плюс половина обводки — штрих
 * центрирован на дуге и наружу торчит ровно наполовину. Обязан остаться
 * и в отступе содержимого карточки, и в зазорах укладки.
 */
export const CARD_SHAPE_INK = CARD_NOTCH_R + CARD_SHAPE_STROKE / 2;

/**
 * Вложенность («квадрат в квадрате»): отступ содержимого от рамки узла.
 * Он же — зазор между соседями внутри рамки: в этот отступ смотрит выпуклость
 * фигуры связи, её вылет `CARD_SHAPE_INK`, и на меньшем зазоре она пересекла бы
 * рамку соседней карточки.
 */
export const BOX_PADDING = 24;
export const BOX_CHILD_GAP = 24;

/** Высота заголовка рамки: в одну строку и в две. */
export const BOX_HEADER_H = 24;
export const BOX_HEADER_TWO_LINES_H = 34;

/**
 * Ширина символа моноширинного шрифта. Roboto Mono (это `--font-family-code`
 * портала) и JetBrains Mono прототипа имеют одинаковый шаг — 0.6 от кегля,
 * поэтому обрезка строк считается по числу символов, а не по замеру.
 */
export const monoCharW = (fontSize: number): number => fontSize * 0.6;

/**
 * Метрики заголовка рамки. Заголовок — метка типа, имя и хвост с иконкой
 * технологии; обе метки ровно по 13 символов, поэтому метрика одна.
 *
 * Иконка стоит ПОСЛЕ имени: тогда имя во всех рамках начинается с одной x
 * и выравнивание текста по колонке не разъезжается. Рисуется ли она, решает
 * не константа, а ширина рамки — место под неё резервируется заранее и входит
 * в потолок имени, поэтому петли «ширина → место → иконка → ширина» нет.
 *
 * Имя переносится на две строки: имена узлов развёртывания — это FQDN в полсотни
 * символов, и одной строкой они растягивали рамку вдвое.
 */
export const BOX_HEADER = {
    font: 10,
    padX: 10,
    gap: 6,
    labels: { environment: '[ENVIRONMENT]', node: '[DEPLOY_NODE]' },
    maxNameW: 240,
    lines: 2,
    icon: { size: 14, gap: 4 },
    /** Значок схлопывания: есть только у узлов с вложенными `DeploymentNode`. */
    toggle: { size: 12, gap: 6 },
} as const;

/** X, с которой начинается имя в заголовке (после метки типа). */
export const BOX_NAME_X = BOX_HEADER.padX + monoCharW(BOX_HEADER.font) * 13 + BOX_HEADER.gap;

/** На сколько правее начинается заголовок у узла со значком схлопывания. */
export const BOX_TOGGLE_SLOT = BOX_HEADER.toggle.size + BOX_HEADER.toggle.gap;

/** Сколько символов имени влезает в одну строку заголовка при переносе. */
export const BOX_HEADER_LINE_CHARS = Math.floor(
    BOX_HEADER.maxNameW / BOX_HEADER.lines / monoCharW(BOX_HEADER.font),
);

/** Ширина хвоста заголовка под иконки технологий. */
export const headerIconsWidth = (count: number): number => {
    if (count <= 0) return 0;
    return BOX_HEADER.gap + count * BOX_HEADER.icon.size + (count - 1) * BOX_HEADER.icon.gap;
};

/** Сколько символов имени помещается в строку заголовка заданной ширины. */
export const boxNameChars = (width: number, icons = 0, nameX = BOX_NAME_X): number =>
    Math.max(1, Math.floor((width - nameX - icons - BOX_HEADER.padX) / monoCharW(BOX_HEADER.font)));

/** Ширина, которая нужна рамке, чтобы показать имя целиком (без потолка). */
export const boxHeaderWidth = (
    nameLength: number,
    icons = 0,
    lines = 1,
    nameX = BOX_NAME_X,
): number =>
    nameX + monoCharW(BOX_HEADER.font) * Math.ceil(nameLength / lines) + icons + BOX_HEADER.padX;

/** Предельная ширина рамки, продиктованная заголовком. */
export const boxHeaderMaxWidth = (icons = 0, lines = 1, nameX = BOX_NAME_X): number =>
    nameX + BOX_HEADER.maxNameW / lines + icons + BOX_HEADER.padX;

/** Ширина самого длинного имени в заголовке — по ней встают иконки после имени. */
export const nameLinesWidth = (lines: string[]): number =>
    monoCharW(BOX_HEADER.font) * lines.reduce((max, line) => Math.max(max, line.length), 0);

/** Высота заголовка: две строки требуют на 10 px больше. */
export const boxHeaderHeight = (lines: number): number =>
    lines > 1 ? BOX_HEADER_TWO_LINES_H : BOX_HEADER_H;

/** Базовая линия строки заголовка от его верха. */
export const boxHeaderLineY = (lines: number, index: number): number =>
    lines > 1 ? 13 + index * 14 : 15;

/** Обрезка подписи по числу символов: многоточие вместо хвоста. */
export const fitLabel = (text: string, maxChars: number): string => {
    if (text.length <= maxChars) return text;
    return `${text.slice(0, Math.max(1, maxChars - 3))}...`;
};

/**
 * Имя в несколько строк: многоточие в конце последней строки, поэтому склейка
 * строк всегда остаётся префиксом исходного имени.
 */
export const wrapLabel = (text: string, charsPerLine: number, lines: number): string[] => {
    if (text.length <= charsPerLine || lines <= 1) return [fitLabel(text, charsPerLine)];

    const wrapped: string[] = [];
    for (let i = 0; i < lines; i += 1) {
        const rest = text.slice(i * charsPerLine);
        if (i === lines - 1) {
            wrapped.push(fitLabel(rest, charsPerLine));
            break;
        }
        wrapped.push(rest.slice(0, charsPerLine));
    }
    return wrapped;
};

/**
 * Полоса адреса внутри рамки: строка под заголовком, над содержимым. Отступ тот же,
 * что у заголовка, поэтому адрес читается его продолжением, а не содержимым.
 */
export const BOX_ADDRESS = { h: 18, font: 10, padX: 10, maxW: 320 } as const;

/** Ширина символа в полосе адреса — ею же считается число влезающих символов. */
export const addressChars = (width: number): number =>
    Math.max(1, Math.floor((width - BOX_ADDRESS.padX * 2) / monoCharW(BOX_ADDRESS.font)));

/** Ширина, которая нужна рамке под строку адреса (с потолком). */
export const addressWidth = (line: string): number =>
    BOX_ADDRESS.padX * 2 + monoCharW(BOX_ADDRESS.font) * line.length;

/** Карточка экземпляра: ширина как у карточки узла в движке. */
export const INSTANCE_W = NODE_W;
export const INSTANCE_H = NODE_H;

/** Строка url на карточке добавляет ей 12 px. */
export const URL_LINE_H = 12;
export const INSTANCE_H_URL = INSTANCE_H + URL_LINE_H;

/** Высота карточки одна на всю диаграмму: если url есть хоть у одной, растут все. */
export const cardHeight = (hasAnyUrl: boolean): number => (hasAnyUrl ? INSTANCE_H_URL : INSTANCE_H);

/**
 * Метрики текста карточки. Ширина карточки фиксирована, поэтому имя и подпись
 * обрезаются от неё, а не по числу символов: в карточке 180 px с иконкой технологии
 * (отступ 20 + иконка 14 + зазор 6 + отступ 20) под имя остаётся 120 px.
 *
 * Отступ содержимого выведен из вылета фигуры: вырез — это вырезанная поверхность,
 * и на меньшем отступе он съёл бы первую букву имени.
 */
export const CARD_TEXT = {
    padX: CARD_SHAPE_INK + 1,
    iconGap: 6,
} as const;

/** Значок «×N» в правом нижнем углу карточки. */
export const CARD_BADGE = { font: 10, chars: 3, inset: 12, baseline: 8 } as const;

/**
 * Базовые линии строк карточки от её верха. Подписи типа на карточке нет — тип
 * показывает цветной акцент, — поэтому имя либо стоит по центру карточки (когда
 * второй строки нет), либо поднимается, уступая её подписи.
 */
export const NAME_ALONE_Y = 34;
export const NAME_PAIR_Y = 25;
export const SUBTITLE_Y = 43;
/** Базовая линия строки url — третья строка карточки, под технологией. */
export const URL_Y = 59;

/** Кегли строк карточки и заголовка. */
export const NAME_FONT = 12;
export const SUBTITLE_FONT = 10;
/** Ширина цветного акцента типа и отступ его полосы от краёв карточки. */
export const ACCENT_W = 3;
export const ACCENT_INSET = 8;

/** Ширина, которую в карточке занимает иконка технологии; 0 — иконки нет. */
export const cardIconWidth = (hasIcon: boolean): number =>
    hasIcon ? BOX_HEADER.icon.size + CARD_TEXT.iconGap : 0;

/** X, с которого начинается текст в карточке. */
export const cardTextX = (hasIcon: boolean): number => CARD_TEXT.padX + cardIconWidth(hasIcon);

/**
 * Сколько места в карточке отдано значку «×N» — 0, если значка нет. Берётся
 * от настоящего текста, а не от ожидаемой длины: у контейнера, развёрнутого сто раз,
 * значок на символ шире. Резерв парный — вычитается из бюджета подписи и url.
 */
export const cardBadgeWidth = (text: string): number =>
    text === '' ? 0 : monoCharW(CARD_BADGE.font) * text.length + CARD_TEXT.iconGap;

/**
 * Сколько символов текста помещается в карточку заданной ширины. `reserve` — место,
 * отданное значку экземпляров: у подписи и url он есть, у имени — нуль, имя сидит
 * выше и до значка не достаёт.
 */
export const cardTextChars = (
    width: number,
    hasIcon: boolean,
    fontSize: number,
    reserve = 0,
): number =>
    Math.max(
        1,
        Math.floor((width - cardTextX(hasIcon) - reserve - CARD_TEXT.padX) / monoCharW(fontSize)),
    );

/** Прозрачность «не по делу»: связи контекста и рамки вне выделенного поддерева. */
export const DIMMED_OPACITY = 0.25;

/** Размеры схлопнутого узла: он не считается по содержимому, а фиксирован. */
export const BOX_COLLAPSED = { w: snapSizeToGrid(240), h: INSTANCE_H_URL } as const;

/** Высота строки счётчиков внутри схлопнутой рамки — остаток от её высоты. */
export const COUNTS_LINE_H = BOX_COLLAPSED.h - BOX_HEADER_H - BOX_ADDRESS.h;

/** Пункт селектора «все окружения»: в URL ему соответствует `env=ALL`. */
export const ALL_ENVIRONMENTS = 'ALL';

/** Подпись пункта «все окружения». */
export const ALL_ENVIRONMENTS_LABEL = 'Все окружения';

/**
 * Тег графа: как и во вкладке «Диаграммы», развёртывание смотрим по Global-графу —
 * в Local лежат копии для разработки, и они бы удвоили дерево.
 */
export const DEPLOYMENT_GRAPH_TAG = 'Global';

/** Подписи и подсказки тулбара диаграммы. */
export const TOOLBAR = {
    hint: 'колесо — зум, перетаскивание — сдвиг',
    fit: 'Вписать',
    reset: 'Сброс',
    /** Подпись кнопки выгрузки: формат файла и есть её название. */
    exportSvg: 'SVG',
} as const;

/** Пределы вписывания и зума — перенесены из прототипа без изменений. */
export const VIEWPORT = {
    minZoom: 0.35,
    maxZoom: 2.4,
    maxFitZoom: 1.4,
    fitCoverage: 0.9,
    pad: 40,
    dragSlop: 4,
    wheelStep: 1.1,
    buttonStep: 1.12,
} as const;
