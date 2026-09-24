/**
 * Разбор ответов графа во вход раскладки.
 *
 * Запросы вкладки возвращают не узлы и связи (`n`/`r`/`m`, как в движке диаграмм),
 * а дерево — по строке на узел с готовыми `id`/`parentId`/`ownEnvs`/`addressPairs`.
 * Это осознанное отличие: раскладке развёртывания нужна вложенность, а не граф,
 * и `parentId` в строке избавляет от восстановления дерева по рёбрам. Колонки при
 * этом скалярные, поэтому приведение к `Record<string, unknown>` здесь одно и на весь
 * модуль, а значения проверяются по типам на каждом поле.
 */

import type { ICypherDiagram } from 'api/graph/types';

import type { IDeploymentInstance, IDeploymentLink, IDeploymentNode } from '../types';

import type { AddressPair } from './address';
import { ADDRESS_KEYS } from './address';

type Row = Record<string, unknown>;

/**
 * Тип ответа движка (`ICypherDiagram`) описан под `n`/`r`/`m`, а вкладка просит
 * у графа плоские колонки — приведение неизбежно и безопасно: обе стороны приходят
 * из одного ответа шлюза и разбираются тут же.
 */
const asRows = (rows: ICypherDiagram[]): Row[] => rows as unknown as Row[];

const stringOf = (value: unknown): string | null =>
    typeof value === 'string' && value.length > 0 ? value : null;

/** Числа графа (например `id`) приходят и строкой, и числом — приводим к строке. */
const keyOf = (value: unknown): string | null => {
    if (typeof value === 'string' && value.length > 0) return value;
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
    return null;
};

const stringsOf = (value: unknown): string[] =>
    Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

/**
 * Адресные пары: Cypher отдаёт список `[ключ, значение]`, но значения могут прийти
 * не строками (число, null) — их приводит `toString` в самом запросе, а здесь
 * остаётся проверка формы.
 */
const addressPairsOf = (value: unknown): AddressPair[] => {
    if (!Array.isArray(value)) return [];
    const pairs: AddressPair[] = [];
    for (const pair of value) {
        if (!Array.isArray(pair) || pair.length < 2) continue;
        const [key, item] = pair as [unknown, unknown];
        if (typeof key !== 'string' || typeof item !== 'string' || item === '') continue;
        pairs.push([key, item]);
    }
    return pairs;
};

/** Ключи адресных свойств, которые рисуются, — по ним же проверяются фикстуры. */
export const isAddressKey = (key: string): boolean => {
    const lower = key.toLowerCase();
    return (
        (ADDRESS_KEYS as readonly string[]).includes(lower) ||
        lower.startsWith('hostname') ||
        lower.startsWith('ip')
    );
};

export const parseDeploymentNodes = (rows: ICypherDiagram[]): IDeploymentNode[] => {
    const parsed: IDeploymentNode[] = [];

    asRows(rows).forEach((row) => {
        const id = keyOf(row.id);
        if (!id) return;

        parsed.push({
            id,
            name: stringOf(row.name) ?? id,
            parentId: keyOf(row.parentId),
            ownEnvs: stringsOf(row.ownEnvs),
            type: stringOf(row.type),
            technology: stringOf(row.technology),
            addressPairs: addressPairsOf(row.addressPairs).filter(([key]) => isAddressKey(key)),
        });
    });

    return parsed;
};

export const parseDeploymentInstances = (rows: ICypherDiagram[]): IDeploymentInstance[] => {
    const parsed: IDeploymentInstance[] = [];

    asRows(rows).forEach((row) => {
        const id = keyOf(row.id);
        const parentId = keyOf(row.parentId);
        // Экземпляр без родителя в дерево не встанет: он не «висит в воздухе»,
        // а означает, что узел не попал в выборку — такую карточку не рисуем.
        if (!id || !parentId) return;

        parsed.push({
            id,
            name: stringOf(row.name) ?? id,
            parentId,
            containerName: stringOf(row.containerName),
            technology: stringOf(row.technology),
            url: stringOf(row.url),
            containerId: stringOf(row.containerId),
        });
    });

    return parsed;
};

export const parseDeploymentLinks = (rows: ICypherDiagram[]): IDeploymentLink[] => {
    const parsed: IDeploymentLink[] = [];

    asRows(rows).forEach((row) => {
        const from = keyOf(row.from);
        const to = keyOf(row.to);
        if (!from || !to) return;
        parsed.push({ from, to });
    });

    return parsed;
};
