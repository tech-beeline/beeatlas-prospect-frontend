/**
 * Производные от выделения: приглушение, фигуры связи и карты копирования —
 * перенесено из прототипа (`experiments/beeline-diagrams/src/layout/deployment.ts`).
 *
 * Здесь только чистые функции: они не знают ни про React, ни про SVG, поэтому
 * проверяются на синтетическом дереве.
 */

import type { CardLinkRole, DeploymentBoxKind, IDeploymentBox } from '../types';

import { addressLine } from './address';

/**
 * Заливка поверхности рамки — одна на два места: ею красится `rect` рамки и ею же
 * вырезается выемка в карточке. Разойдясь, они дали бы на месте выреза серый
 * полумесяц: вырез — это заливка поверхности, наложенная поверх карточки.
 *
 * Возвращается значением CSS-переменной: цвета берутся из токенов портала, и тёмная
 * тема переключается сама.
 */
export const boxSurface = (kind: DeploymentBoxKind): string =>
    kind === 'environment' ? 'var(--color-background-base)' : 'var(--color-background-secondary)';

/**
 * Адрес каждой рамки по её id — то, что стоит на экране в полосе под заголовком
 * и что уходит в буфер обмена, когда узел выбирают кликом. Ключи — только узлы:
 * адресные свойства есть у `DeploymentNode`, у карточек `ContainerInstance` адресов
 * нет вовсе. Карточка копирует свой url — он в соседней таблице.
 */
export const addressByBoxId = (boxes: IDeploymentBox[]): Map<string, string> => {
    const map = new Map<string, string>();
    const walk = (list: IDeploymentBox[]): void => {
        for (const box of list) {
            if (box.addresses.length > 0) map.set(box.id, addressLine(box.addresses));
            walk(box.children);
        }
    };
    walk(boxes);
    return map;
};

/**
 * url контейнера по тому же id, которым диаграмма выбирает и копирует элемент:
 * карточка адресуется id своего экземпляра. Значение — только непустой url:
 * у 857 контейнеров стенда он заполнен, у остальных ключа нет вовсе, и клик
 * по такой карточке ничего не копирует.
 */
export const urlByBoxId = (boxes: IDeploymentBox[]): Map<string, string> => {
    const map = new Map<string, string>();
    const walk = (list: IDeploymentBox[]): void => {
        for (const box of list) {
            for (const instance of box.instances) {
                if (instance.url) map.set(instance.id, instance.url);
            }
            walk(box.children);
        }
    };
    walk(boxes);
    return map;
};

/**
 * Что уходит в буфер обмена, когда элемент выбирают кликом: url контейнера, а если
 * его нет — адрес узла, в рамке которого карточка нарисована.
 *
 * Запасной адрес для карточки нужен потому, что узел с адресом рисуется рамкой:
 * без него клик по карточке узла с адресом не копировал бы ничего. Копируется при
 * этом адрес рамки — тот, что виден в её полосе прямо над карточкой.
 *
 * Оба поля необязательные: чего нет, того в словаре нет, и клик тогда ничего
 * не копирует — подсказка «скопировано» на пустом месте хуже молчания.
 */
export const copyByBoxId = (boxes: IDeploymentBox[]): Map<string, string> => {
    const map = urlByBoxId(boxes);
    for (const [id, value] of addressByBoxId(boxes)) {
        if (!map.has(id)) map.set(id, value);
    }

    const walk = (list: IDeploymentBox[]): void => {
        for (const box of list) {
            const address = addressLine(box.addresses);
            if (address !== '') {
                for (const instance of box.instances) {
                    if (!map.has(instance.id)) map.set(instance.id, address);
                }
            }
            walk(box.children);
        }
    };
    walk(boxes);
    return map;
};

/**
 * Соседи по связи, без направления: id → множество связанных id. Обе стороны пары
 * попадают в словарь, хотя запрос отдаёт рёбра направленными: «гасить» — вопрос
 * не направления, а самого факта связи.
 */
export const linksByInstanceId = (
    rows: readonly { from: string; to: string }[],
): Map<string, Set<string>> => {
    const map = new Map<string, Set<string>>();
    const link = (a: string, b: string): void => {
        const set = map.get(a);
        if (set) set.add(b);
        else map.set(a, new Set([b]));
    };
    for (const row of rows) {
        if (row.from === row.to) continue;
        link(row.from, row.to);
        link(row.to, row.from);
    }
    return map;
};

/**
 * Лежит ли выделенный элемент внутри поддерева узла `ancestorId` — перенесено
 * из прототипа. Нужно при схлопывании: если выделение скрылось под схлопнутым
 * узлом, его надо снять, иначе оно осталось бы на невидимом элементе.
 *
 * Выделен может быть и узел, и карточка, поэтому от карточки сначала поднимаемся
 * к её узлу. Подъём — по `parentId` с защитой от цикла: граф дерево, но обход
 * не должен зависеть от этого.
 */
export const isInsideSubtree = (
    selectedId: string,
    ancestorId: string,
    nodes: readonly { id: string; parentId: string | null }[],
    instances: readonly { id: string; parentId: string | null }[],
): boolean => {
    const parentOf = new Map(nodes.map((node) => [node.id, node.parentId]));
    const instance = instances.find((item) => item.id === selectedId);

    let current: string | null = instance ? instance.parentId : selectedId;
    const seen = new Set<string>();

    while (current) {
        if (current === ancestorId) return true;
        if (seen.has(current)) return false;
        seen.add(current);
        current = parentOf.get(current) ?? null;
    }
    return false;
};

/**
 * «Гасить нечего». Один объект на всех: он неизменяемый, и держать его в общем
 * модуле дешевле, чем создавать пустое множество на каждый рендер диаграммы.
 */
export const NOTHING_DIMMED: ReadonlySet<string> = new Set();

/**
 * Что приглушить при выделении карточки: рамка гаснет ⟺ в её поддереве нет ни
 * одного экземпляра, связанного с выделенным, — а карточка гаснет по своему
 * экземпляру. Правило одно: подъём снизу вверх, активность узла — дизъюнкция
 * активности его карточек и детей.
 *
 * Из него бесплатно выходит всё остальное: рамки-предки выделенной карточки
 * светятся, рамка окружения светится всегда, пустая рамка гаснет, и отдельного
 * исключения «не гасить свою рамку» не нужно.
 *
 * Гасить нечего в трёх случаях, и все три — состояние диаграммы, а не ошибка вызова:
 * ничего не выделено; выделена рамка (клик по рамке — жест «скопировать адрес узла»,
 * вид диаграммы он не меняет); выделенный id не принадлежит ни одной карточке —
 * так выглядит смена окружения, после которой выделение осталось от прежнего дерева.
 */
export const dimmedBySelection = (
    boxes: IDeploymentBox[],
    links: ReadonlyMap<string, ReadonlySet<string>>,
    selectedId: string | null,
): ReadonlySet<string> => {
    if (selectedId === null) return NOTHING_DIMMED;

    const dimmed = new Set<string>();
    let selectionFound = false;

    // Активные — выделенный и все его соседи.
    const active = new Set<string>([selectedId, ...(links.get(selectedId) ?? [])]);

    const walk = (list: IDeploymentBox[]): boolean => {
        let subtreeActive = false;
        for (const box of list) {
            let boxActive = false;
            for (const instance of box.instances) {
                if (instance.id === selectedId) selectionFound = true;
                if (active.has(instance.id)) boxActive = true;
                else dimmed.add(instance.id);
            }
            // Дети обходятся всегда: активная карточка в глубине делает активными
            // и свою рамку, и все рамки над ней.
            const childrenActive = walk(box.children);
            if (!boxActive && !childrenActive) dimmed.add(box.id);
            subtreeActive = subtreeActive || boxActive || childrenActive;
        }
        return subtreeActive;
    };
    walk(boxes);

    return selectionFound ? dimmed : NOTHING_DIMMED;
};

/** id всех карточек дерева — по нему видно, что выделение вообще с этого дерева. */
export const cardIdsOf = (boxes: readonly IDeploymentBox[]): Set<string> => {
    const ids = new Set<string>();
    const walk = (list: readonly IDeploymentBox[]): void => {
        for (const box of list) {
            for (const instance of box.instances) ids.add(instance.id);
            walk(box.children);
        }
    };
    walk(boxes);
    return ids;
};

/** «Фигур нет». Один объект на всех — по образцу NOTHING_DIMMED. */
export const NOTHING_RELATED: ReadonlyMap<string, CardLinkRole> = new Map();

/**
 * Роли карточек при выделенном экземпляре: выделенный ЗОВЁТ карточку — ей выемка
 * (`socket`), карточка зовёт выделенного — ей выпуклость (`bump`), связи в обе
 * стороны — обе фигуры. Направление приходит из графа: запрос направленный,
 * `from` — вызывающий, `to` — вызываемый.
 *
 * Фигур нет в тех же трёх случаях, что и приглушения: ничего не выделено; выделена
 * не карточка, а рамка; выделенный id не с этого дерева. Приглушение при этом
 * остаётся неориентированным намеренно: «кто кого зовёт» решает, какую фигуру
 * рисовать, но не решает, что гасить.
 */
export const rolesBySelection = (
    boxes: readonly IDeploymentBox[],
    rows: readonly { from: string; to: string }[],
    selectedId: string | null,
): ReadonlyMap<string, CardLinkRole> => {
    if (selectedId === null) return NOTHING_RELATED;
    if (!cardIdsOf(boxes).has(selectedId)) return NOTHING_RELATED;

    const roles = new Map<string, CardLinkRole>();
    const add = (id: string, role: CardLinkRole): void => {
        const current = roles.get(id);
        if (current === undefined) roles.set(id, role);
        else if (current !== role) roles.set(id, 'both');
    };

    for (const row of rows) {
        // Петля не делает карточку связанной с самой собой: это не связь,
        // а дефект данных.
        if (row.from === row.to) continue;
        if (row.from === selectedId) add(row.to, 'socket');
        else if (row.to === selectedId) add(row.from, 'bump');
    }
    return roles;
};
