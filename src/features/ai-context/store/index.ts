import { create } from 'zustand';

import { IContextStore, PageContext } from './types';

const emptyPageContext = (): PageContext => ({
    pageId: '',
    pageDescription: '',
    uiState: {},
});

export const usePageContextStore = create<IContextStore>((set) => ({
    context: null,

    setContext: (context) =>
        set((state) => ({
            context: {
                ...context,
                additionalContext: state.context?.additionalContext ?? {},
            },
        })),

    setAdditionalContext: (key, value) =>
        set((state) => {
            const baseContext = state.context ?? emptyPageContext();

            return {
                context: {
                    ...baseContext,
                    additionalContext: {
                        ...(baseContext.additionalContext ?? {}),
                        [key]: value,
                    },
                },
            };
        }),

    removeAdditionalContext: (key) =>
        set((state) => {
            if (!state.context?.additionalContext) {
                return state;
            }

            const { [key]: _, ...rest } = state.context.additionalContext;

            return {
                context: {
                    ...state.context,
                    additionalContext: rest,
                },
            };
        }),

    clearAdditionalContext: () =>
        set((state) => {
            if (!state.context) {
                return state;
            }

            return {
                context: {
                    ...state.context,
                    additionalContext: {},
                },
            };
        }),

    clearContext: () =>
        set({
            context: null,
        }),
}));
