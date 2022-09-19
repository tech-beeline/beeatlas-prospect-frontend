export interface IGeneralStore {
    isAuth: boolean;
    themeIsDark: boolean;
    userInfo: any;

    setAuth(isAuth: boolean): void;
    setUserInfo(user: any): void;
    clearAuth(): void;
    toggleTheme: () => void;
}
