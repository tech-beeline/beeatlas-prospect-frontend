export interface IAuthStore {
    isAuth: boolean;

    isLoadingAuth: boolean;

    authId: string;

    accessToken: string;
    refreshToken: string;

    setAuth: (bool: boolean) => void;

    setLoadingAuth: (bool: boolean) => void;

    setAuthId: (authId: string) => void;

    auth: (phone: string) => Promise<boolean> | unknown;
    authCheck: (authId: string) => Promise<any | boolean>;

    logout: () => void;
}
