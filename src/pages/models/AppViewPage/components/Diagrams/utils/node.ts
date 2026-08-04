import { C4Node } from '../components';
import { KNOWN_LABELS } from '../const';
import { C4Label, PinnedEntry } from '../types';

export const mainLabel = (labels: string[]): string =>
    labels.find((l) => KNOWN_LABELS.includes(l as C4Label)) ?? labels[0] ?? 'unknown';

export const nodeDisplayName = (node: C4Node): string => {
    const originalName = node.properties.originalName;

    if (typeof originalName === 'string' && originalName.trim()) {
        return originalName.trim();
    }

    if (typeof node.name === 'string' && node.name.trim()) {
        return node.name.trim();
    }

    return node.id;
};

export const cloneC4Node = (node: C4Node): C4Node => ({
    ...node,
    labels: [...node.labels],
    properties: { ...node.properties },
});

export const c4NodeFromPinnedEntry = (entry: PinnedEntry): C4Node => {
    const properties: Record<string, unknown> = {
        name: entry.name,
    };

    if (entry.originalName) {
        properties.originalName = entry.originalName;
    }

    return {
        id: entry.id,
        name: entry.name,
        labels: [...entry.labels],
        properties,
    };
};
