import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IAuthStore } from './types';

const defaultValues = {
    userInfo: null,
    isAuthorizing: true,
};

export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            ...defaultValues,
            setUserInfo: (userInfo) => {
                set(() => ({ userInfo }));
            },
            setIsAuthorizing: (isAuthorizing) => {
                set(() => ({ isAuthorizing }));
            },
            clearStore: () => {
                set(() => ({ ...defaultValues }));
            },
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({
                userInfo: state.userInfo,
            }),
        },
    ),
);
