import { create } from 'zustand';

import { ISideSheetState } from './types';

export const useSideSheetStore = create<ISideSheetState>((set) => ({
    openSideSheet: null,
    payload: null,

    toggleSideSheet: (variant, payload = null) =>
        set((state) => {
            const isClosing = state.openSideSheet === variant;
            return {
                openSideSheet: isClosing ? null : variant,
                payload: isClosing ? null : payload,
            };
        }),

    closeSideSheet: () =>
        set({
            openSideSheet: null,
            payload: null,
        }),
}));
