import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IHiddenRowsStore } from './types';

export const useHiddenRowsStore = create<IHiddenRowsStore>()(
    persist(
        (set) => ({
            hiddenRows: [],
            showHiddenRows: false,
            setHiddenRows: (rowIds) => {
                set(() => ({ hiddenRows: rowIds }));
            },
            setShowHiddenRows: (flag) => {
                set(() => ({ showHiddenRows: flag }));
            },
        }),
        { name: 'hidden-rows-store' },
    ),
);
