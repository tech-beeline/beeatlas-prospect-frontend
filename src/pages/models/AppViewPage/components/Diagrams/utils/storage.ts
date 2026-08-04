import { LAYOUT_STORAGE_PREFIX, PINNED_STORAGE_PREFIX } from '../const';
import { DiagramLayoutPersist, PinnedEntry } from '../types';

export const layoutStorageKey = (productAlias: string, anchorNodeId: string) =>
    `${LAYOUT_STORAGE_PREFIX}${productAlias}::${anchorNodeId}`;

export const loadLayout = (key: string): DiagramLayoutPersist | null => {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) {
            return null;
        }
        const parsed = JSON.parse(raw) as DiagramLayoutPersist;
        if (!parsed || typeof parsed !== 'object' || !parsed.nodePositions) {
            return null;
        }
        return parsed;
    } catch {
        return null;
    }
};

export const saveLayout = (key: string, data: DiagramLayoutPersist) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch {
        // no-op
    }
};

export const loadPinnedEntries = (productAlias: string): PinnedEntry[] => {
    try {
        const raw = localStorage.getItem(PINNED_STORAGE_PREFIX + productAlias);
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter(
            (x): x is PinnedEntry =>
                x != null &&
                typeof x === 'object' &&
                typeof (x as PinnedEntry).id === 'string' &&
                typeof (x as PinnedEntry).name === 'string' &&
                Array.isArray((x as PinnedEntry).labels),
        );
    } catch {
        return [];
    }
};

export const persistPinnedEntries = (productAlias: string, entries: PinnedEntry[]) => {
    try {
        localStorage.setItem(PINNED_STORAGE_PREFIX + productAlias, JSON.stringify(entries));
    } catch {
        // no-op
    }
};
