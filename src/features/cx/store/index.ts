import { create } from 'zustand';

import { ISideSheetState } from './types';

export const useSideSheetStore = create<ISideSheetState>((set) => ({
    openSideSheet: null,
    payload: null,

    toggleSideSheet: (variant, payload = null) =>
        set((state) => {
            if (state.openSideSheet === variant) {
                return {
                    openSideSheet: null,
                    payload: null,
                };
            }

            return {
                openSideSheet: variant,
                payload,
            };
        }),

    closeSideSheet: () =>
        set({
            openSideSheet: null,
            payload: null,
        }),
}));
