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

    // СТРАНИЦА КАЛЕНДАРЯ
    setCalendarData: () => void;

    // АДМИНКА
    profiles: Record<string, any>[];
    currentRole: any;
    roles: Record<string, any>[];
    setCurrentRole: (role: any | IRole) => void;

    getProfiles: () => void;
    getRoles: () => void;
    createRole: (data: IRole) => Promise<Record<string, any>> | unknown;
    changeRole: (data: IRole) => void;
    getCurrentRole: (id: number) => void;
    deleteRole: (id: number) => void;
    getRolePermission: (id: number) => void;
    saveChangeRolePermission: (id: number) => void;

    // ТЕХ РАДАР
    getTechRadar: () => void;
    techRadarData: any[];

    // РОЛИ
    permission: any[];
}
