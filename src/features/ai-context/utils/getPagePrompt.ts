import { PAGE_CONTEXTS } from './registry';

export const getPagePrompt = (pageId: string, activeTab?: string) => {
    const page = PAGE_CONTEXTS[pageId];

    if (!page) {
        return '';
    }

    return [page.context, activeTab ? page.context ?? '' : ''].filter(Boolean).join('\n\n');
};
