import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IThemeStore } from './types';

export const useThemeStore = create<IThemeStore>()(
    persist(
        (set) => ({
            themeIsDark: false,
            toggleTheme: () => {
                set((state) => ({ themeIsDark: !state.themeIsDark }));
            },
        }),
        { name: 'theme-store' },
    ),
);
