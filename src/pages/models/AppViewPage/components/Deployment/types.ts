/**
 * Доменные типы диаграммы развёртывания — перенесены из прототипа
 * (`experiments/beeline-diagrams/src/layout/deployment.ts`).
 */

import type { AddressPair } from './utils/address';

export interface IDeployment {
    /** Код продукта из query-параметра страницы (`?cmdb=`): на деле это alias. */
    cmdb: string | null;
}

/** Узел дерева развёртывания: `DeploymentNode` вместе с его связями. */
export interface IDeploymentNode {
    id: string;
    name: string;
    /** Родительский `DeploymentNode`; null — узел корневой. */
    parentId: string | null;
    /** Тип узла из графа: `k8s`, `k8s-ns`, `vm`, `postgresql`. */
    type: string | null;
    /** Своя технология узла — она показывается иконкой в заголовке рамки. */
    technology: string | null;
    /** Пары «ключ, значение» адресных свойств — их разбирает `pickAddresses`. */
    addressPairs: AddressPair[];
    /** Окружения, привязанные к самому узлу живым ребром (колонка `ownEnvs`). */
    ownEnvs: string[];
}

/** Экземпляр контейнера: `ContainerInstance` вместе с данными его `Container`. */
export interface IDeploymentInstance {
    id: string;
    name: string;
    parentId: string | null;
    /** Имя исходного `Container` (хвост `~cmdb...` отрезан). */
    containerName: string | null;
    technology: string | null;
    url: string | null;
    /** id исходного `Container` — по нему считается «×N»; фолбэк — имя. */
    containerId: string | null;
}

/** Связь экземпляров: `from` зовёт `to` (направление важно для фигур связи). */
export interface IDeploymentLink {
    from: string;
    to: string;
}

/** Экземпляр в раскладке: то, что рисует карточка. */
export interface IDeploymentCard {
    id: string;
    name: string;
    containerName?: string;
    technology?: string;
    /** id иконки технологии; null — технологии у экземпляра нет. */
    icon: string | null;
    /** url контейнера — третья строка карточки. */
    url?: string;
    /** Сколько раз этот контейнер развёрнут на этой диаграмме (значок «×N»). */
    copies: number;
}

export type DeploymentBoxKind = 'environment' | 'node';

/** Рамка диаграммы: узел развёртывания или окружение над его корнями. */
export interface IDeploymentBox {
    id: string;
    name: string;
    /** Имя, разбитое на строки заголовка; полное лежит в подсказке. */
    nameLines: string[];
    kind: DeploymentBoxKind;
    /** Абсолютные координаты после раскладки. */
    x: number;
    y: number;
    width: number;
    height: number;
    /** Высота заголовка: у двухстрочного она больше. */
    headerH: number;
    /** С какой x внутри рамки начинается имя (узел со значком схлопывания — правее). */
    nameX: number;
    /**
     * Своя технология узла — и только она, без агрегата по поддереву. У окружения
     * технологий нет: это рамка вокруг корней, а не узел сети.
     */
    technologies: { id: string; label: string }[];
    /** Сколько иконок нарисовано в заголовке и сколько места они заняли. */
    headerIconCount: number;
    headerIcons: number;
    /** Адреса узла, до двух, в порядке предпочтения; пусто — адреса нет. */
    addresses: string[];
    /** Строка адреса, обрезанная под ширину рамки; полная лежит в `addresses`. */
    addressShort: string;
    /** Высота полосы адреса: у узла есть всегда, у окружения — 0. */
    addressBand: number;
    /** Высота карточки в этой раскладке — одна на всю диаграмму. */
    cardH: number;
    /** Есть ли под узлом вложенные `DeploymentNode` (только у таких есть значок). */
    collapsible: boolean;
    /** Узел схлопнут: поддерева в раскладке нет, рамка фиксированного размера. */
    collapsed: boolean;
    /** Сколько вложенных узлов скрыто внутри (без самого узла). */
    nestedNodes: number;
    /** Сколько карточек скрыто внутри. */
    nestedContainers: number;
    children: IDeploymentBox[];
    instances: IDeploymentCard[];
    /** Смещения экземпляров внутри этой рамки. */
    instanceOffsets: { id: string; x: number; y: number }[];
}

export interface IDeploymentLayout {
    boxes: IDeploymentBox[];
    width: number;
    height: number;
}

/** Вход раскладки: дерево уже разрезано по выбранному окружению. */
export interface IDeploymentLayoutInput {
    /** null — все окружения разом, тогда рамки окружения нет. */
    environment: string | null;
    nodes: IDeploymentNode[];
    instances: IDeploymentInstance[];
    /** id схлопнутых узлов: их поддеревья в раскладку не попадают. */
    collapsed?: ReadonlySet<string>;
}

/** Фигура связи у карточки: выемка слева, выпуклость справа или обе. */
export type CardLinkRole = 'socket' | 'bump' | 'both';
