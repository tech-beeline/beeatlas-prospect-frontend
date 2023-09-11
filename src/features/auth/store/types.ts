export interface IAuthStore {
    isAuth: boolean;
    userInfo: Record<string, any> | null;
    accessToken: string;
    refreshToken: string;
    code: string;
    state: string;
    setIsAuth: (isAuth: boolean) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    setUserInfo: (userInfo: Record<string, any> | null) => void;
    setCodeAndState: (code: string, state: string) => void;
    clearStore: () => void;
}
