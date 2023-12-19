import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IAuthStore } from './types';

const defaultValues = {
    isAuth: false,
    userInfo: null,
    isAuthorizing: null,
};

export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            ...defaultValues,
            setIsAuth: (isAuth) => {
                set(() => ({ isAuth }));
            },
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
        { name: 'auth-store' },
    ),
);
