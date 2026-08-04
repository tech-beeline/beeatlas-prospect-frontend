import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ITopBannerStore {
    isClosed: boolean;
    close: () => void;
}

export const useTopBannerStore = create<ITopBannerStore>()(
    persist(
        (set) => ({
            isClosed: false,
            close: () => set({ isClosed: true }),
        }),
        { name: 'top-banner-store' },
    ),
);
