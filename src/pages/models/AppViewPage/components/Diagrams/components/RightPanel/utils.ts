import { C4Node } from '../GraphCanvas/types';

export const stringifyPropertyValue = (value: unknown): string =>
    typeof value === 'object' ? JSON.stringify(value) : String(value);

export const isNodePinned = (pinnedNodeIds: Set<string>, node: C4Node): boolean =>
    pinnedNodeIds.has(node.id);

export const propertiesValueToText = (value: unknown): string | number | null | undefined => {
    if (value == null) return value;
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value;
    if (typeof value === 'boolean') return String(value);
    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
};
