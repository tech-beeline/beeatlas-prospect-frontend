import { PageContext } from '../store/types';

export const isUiContextEqual = (
    sessionUiContext: string,
    currentContext: PageContext | null,
): boolean => {
    if (!currentContext) {
        return false;
    }

    try {
        const sessionContext = JSON.parse(sessionUiContext) as PageContext;

        return JSON.stringify(sessionContext) === JSON.stringify(currentContext);
    } catch {
        return false;
    }
};
