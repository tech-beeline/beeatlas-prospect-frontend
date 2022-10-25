export interface IGeneralStore {
    isAuth: boolean;
    themeIsDark: boolean;
    userInfo: any;

    setAuth(isAuth: boolean): void;
    setUserInfo(user: any): void;
    clearAuth(): void;
    toggleTheme: () => void;

    // ПОИСК
    resultSearch: any[] | 'nodata';
    isLoadingSearch: boolean;
    setLoadingSearch: (bool: boolean) => void;
    getResultSearch: (value: string) => Promise<any> | unknown;
}
