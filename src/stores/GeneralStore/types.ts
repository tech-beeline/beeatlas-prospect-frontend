import { IRole } from 'api/personal-area/types';

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
    generalMenuItems: INestingMenuItem[];
    getGeneralMenuItems: () => void;
    setGeneralMenuItems: (arr: any[]) => void;

    activeFDMItem: INestingMenuItem;
    setActiveFDMItem: (item: INestingMenuItem) => void;

    treeExpandArray: number[];
    handleCheckTreeExpandId: (id: number) => void;

    // TODO: type
    itemChildren: any[];
    isItemChildren: boolean;
    getItemChildren: (id: number, level: number) => Promise<any> | unknown;

    isLoadingMenuItems: boolean;
    isLoadingChildren: boolean;
    setLoadingMenuItems: (bool: boolean) => void;
    setLoadingChildren: (bool: boolean) => void;

    setMenuTreeItems: (data: INestingMenuItem[]) => void;
    menuTreeItems: INestingMenuItem[];

    breadCrumbsFormat: (id: number) => void;
    breadCrumbsItems: any[]; // [{...}, {...}]
    breadCrumbsIds: number[]; // [1,2,3]

    // СТРАНИЦА КАЛЕНДАРЯ
    setCalendarData: () => void;

    alreadyResponse: number[];

    // АДМИНКА
    getRoles: () => void;
    createRole: (data: IRole) => void;
    changeRole: (data: IRole) => void;
    getCurrentRole: (id: number) => void;
    deleteRole: (id: number) => void;
    getRolePermission: (id: number) => void;
    saveChangeRolePermission: (id: number) => void;

    // ТЕХ РАДАР
    getTechRadar: () => void;
    techRadarData: any[];
}

export interface INestingMenuItem {
    id: number;
    name: string;
    guid: string;
    descr: string;
    parent: number;
    alias?: string;
    level: number;
    children?: any[];
    stereotype?: 'TECHNICAL' | 'BUSINESS';

    activeFDMItem: INestingMenuItem;
    setActiveFDMItem(props: INestingMenuItem): void;
    treeExpandArray: number[];
    getItemChildren(id: number, level: number): Promise<any> | unknown;
    // TODO: type
    itemChildren: any[];
    // TODO: убрать
    isItemChildren: boolean;
    isChildren: boolean;
}
