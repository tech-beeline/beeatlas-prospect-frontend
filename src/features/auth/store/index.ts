import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IAuthStore } from './types';

const defaultValues = {
    userInfo: null,
    isAuthorizing: true,
    isError: false,
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
            setIsError: (isError) => {
                set(() => ({ isError }));
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
