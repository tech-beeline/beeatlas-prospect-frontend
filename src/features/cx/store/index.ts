import { create } from 'zustand';

import { ISideSheetState } from './types';

export const useSideSheetStore = create<ISideSheetState>((set) => ({
    openSideSheet: null,

    toggleSideSheet: (variant) =>
        set((state) => ({
            openSideSheet: state.openSideSheet === variant ? null : variant,
        })),

    closeSideSheet: () => set({ openSideSheet: null }),
}));
