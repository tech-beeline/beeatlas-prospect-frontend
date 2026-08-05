import { PAGE_ID_LABELS, PageId } from '../pageId';

const PAGE_IDS = new Set<string>(Object.values(PageId));

export const getSessionContextLabel = (uiContext: string | null): string | null => {
    if (!uiContext) {
        return null;
    }

    try {
        const parsed = JSON.parse(uiContext) as {
            pageId?: string;
            entity?: { id?: number | string };
        };
        const pageId = parsed.pageId;
        const entityId = parsed.entity?.id;

        if (pageId && PAGE_IDS.has(pageId)) {
            return `«${PAGE_ID_LABELS[pageId as PageId]}»${entityId ? `, id = ${entityId}` : ''}`;
        }
    } catch {
        return null;
    }

    return null;
};
