import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IAuthStore } from './types';

const defaultValues = {
    isAuth: false,
    userInfo: null,
    accessToken: '',
    refreshToken: '',
    code: '',
    state: '',
};

export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            ...defaultValues,
            setIsAuth: (isAuth) => {
                set(() => ({ isAuth }));
            },
            setTokens: (accessToken, refreshToken) => {
                set(() => ({ accessToken, refreshToken }));
            },
            setUserInfo: (userInfo) => {
                set(() => ({ userInfo }));
            },
            setCodeAndState: (code, state) => {
                set(() => ({ code, state }));
            },
            clearStore: () => {
                set(() => ({ ...defaultValues }));
            },
        }),
        { name: 'auth-store' },
    ),
);
