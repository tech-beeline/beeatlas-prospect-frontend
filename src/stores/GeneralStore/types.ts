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
    resultTitle: string;
    setLoadingSearch: (bool: boolean) => void;
    getResultSearch: (value: string) => Promise<any> | unknown;
    setResultTitle: (value: string) => void;

    // FDM
    activeFDMItem: INestingMenuItem;
    setActiveFDMItem: (item: INestingMenuItem) => void;
    treeExpandArray: number[];
    handleCheckTreeExpandId: (id: number) => void;
    // TODO: type
    itemChildren: any[];
    getItemChildren: (id: number, level: number) => Promise<any> | unknown;
    isLoadingChildren: boolean;
    setLoadingChildren: (bool: boolean) => void;

    // СТРАНИЦА КАЛЕНДАРЯ
    setCalendarData: () => void;
}

export interface INestingMenuItem {
    id: number;
    name: string;
    guid: string;
    descr: string;
    parent: number;
    alias: string;
    level: number;
    children?: any[];

    activeFDMItem: INestingMenuItem;
    setActiveFDMItem(props: INestingMenuItem): void;
    treeExpandArray: number[];
    getItemChildren(id: number, level: number): Promise<any> | unknown;
    // TODO: type
    itemChildren: any[];
}
