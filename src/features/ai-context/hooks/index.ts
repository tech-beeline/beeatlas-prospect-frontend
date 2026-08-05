import { useEffect, useRef } from 'react';

import { usePageContextStore } from '../store';

import { IUsePageContext } from './types';

export const usePageContext = ({ page, entityType, entityId, activeTab }: IUsePageContext) => {
    const setContext = usePageContextStore((state) => state.setContext);
    const clearContext = usePageContextStore((state) => state.clearContext);

    useEffect(() => {
        const pageContext = {
            pageId: page.pageId,
            pageDescription: page.context,
            entity:
                entityType && entityId
                    ? {
                          type: entityType,
                          id: entityId,
                      }
                    : undefined,

            uiState: {
                activeTab,
            },
        };

        setContext(pageContext);

        return () => {
            clearContext();
        };
    }, [page.pageId, entityType, entityId, activeTab, setContext, clearContext]);
};

export const useAdditionalPageContext = (key: string, context: unknown) => {
    const setAdditionalContext = usePageContextStore((state) => state.setAdditionalContext);

    const removeAdditionalContext = usePageContextStore((state) => state.removeAdditionalContext);

    const previousContext = useRef<string | null>(null);

    useEffect(() => {
        const serializedContext = context ? JSON.stringify(context) : null;

        if (previousContext.current === serializedContext) {
            return;
        }

        previousContext.current = serializedContext;

        if (context) {
            setAdditionalContext(key, context);
        } else {
            removeAdditionalContext(key);
        }
    }, [key, context, setAdditionalContext, removeAdditionalContext]);

    useEffect(() => {
        return () => {
            removeAdditionalContext(key);
        };
    }, [key, removeAdditionalContext]);
};
