import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { MAX_SUCCESSFUL_QUERIES, SUCCESSFUL_QUERIES_SESSION_KEY } from './const';
import { ICypherPageStore } from './types';

export const useCypherPageStore = create<ICypherPageStore>()(
    persist(
        (set) => ({
            successfulQueries: [],
            addSuccessfulQuery: (query) => {
                const nextQuery = query.trim();
                if (!nextQuery) return;

                set((state) => {
                    const rest = state.successfulQueries.filter((q) => q !== nextQuery);
                    return {
                        successfulQueries: [nextQuery, ...rest].slice(0, MAX_SUCCESSFUL_QUERIES),
                    };
                });
            },
            clearSuccessfulQueries: () => set({ successfulQueries: [] }),
        }),
        {
            name: SUCCESSFUL_QUERIES_SESSION_KEY,
            storage:
                typeof window === 'undefined' ? undefined : createJSONStorage(() => sessionStorage),
        },
    ),
);
