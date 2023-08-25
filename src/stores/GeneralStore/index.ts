import { getCalendarData } from 'api/calendar';
import { getSearchResult } from 'api/fdm';
import {
    deleteRole,
    getCurrentRole,
    getProfiles,
    getRolePermission,
    getRoles,
    postRole,
    putRole,
    putRolePermission,
} from 'api/personal-area';
import { getTechRadar } from 'api/tech-radar';
import { getStorage, persistStorage, removeItemStorage } from 'stores/utils';

// TODO: вынести
import { IGeneralStore } from './types';

export * from './types';

export const GeneralStore = (): IGeneralStore => {
    const themeIsDarkKey = 'themeIsDark';
    const isAuthKey = 'isAuth';
    const userInfoKey = 'userInfo';

    const themeIsDark = getStorage(themeIsDarkKey) === 'true';
    const isAuth = getStorage(isAuthKey) === 'true';
    const userInfo = getStorage(userInfoKey, true);

    const currentRole = getStorage('currentRole', true);

    return {
        isAuth: isAuth || false,
        themeIsDark: themeIsDark || false,
        userInfo: userInfo || {},

        isLoadingSearch: false,
        resultSearch: [],
        resultTitle: '',

        techRadarData: [],

        profiles: [],
        currentRole: currentRole || null,
        roles: [],
        permission: [],

        setAuth(isAuth) {
            this.isAuth = isAuth;

            persistStorage('isAuth', this.isAuth.toString());
        },

        setUserInfo(userInfo) {
            this.userInfo = userInfo;

            persistStorage('userInfo', this.userInfo, true);
        },

        clearAuth() {
            this.isAuth = false;

            removeItemStorage(userInfoKey);
            removeItemStorage(isAuthKey);
            removeItemStorage('token');

            persistStorage('isAuthorized', 'false');
        },

        toggleTheme() {
            this.themeIsDark = !this.themeIsDark;

            persistStorage(themeIsDarkKey, this.themeIsDark.toString());
        },

        // ПОИСК

        setLoadingSearch(isLoadingSearch) {
            this.isLoadingSearch = isLoadingSearch;
        },

        async getResultSearch(value) {
            this.resultSearch = [];

            this.setLoadingSearch(true);

            let data;

            try {
                const res = await getSearchResult(value);

                if (res) {
                    data = await res.data;

                    data.length === 0 ? (this.resultSearch = 'nodata') : (this.resultSearch = data);
                } else {
                    // TODO: убрать
                    this.resultSearch = 'nodata';
                }

                // return data;
            } catch (error) {
                console.error((error as Error).message);

                // TODO: убрать
                this.resultSearch = 'nodata';
            } finally {
                this.setLoadingSearch(false);
            }
        },

        // TODO: убрать
        setResultTitle(title: string) {
            this.resultTitle = title;
        },

        // Страница с календарем

        async setCalendarData() {
            // TODO: сделать лоудер

            try {
                const res = await getCalendarData();

                console.log('res', res);
            } catch (error) {}
        },

        // ------PERSONAL AREA------------------------

        setCurrentRole(role) {
            this.currentRole = role;

            persistStorage('currentRole', this.currentRole, true);
        },

        // страница Ролей

        async getProfiles() {
            try {
                const res = await getProfiles();

                this.profiles = res.data;
                return res;
            } catch (error) {
                console.error((error as Error).message);
            }
        },

        async getRoles() {
            try {
                const res = await getRoles();

                this.roles = res.data;
                return res;
            } catch (error) {
                console.error((error as Error).message);
            }
        },

        // id: number
        // name?: string;
        // alias?: string;
        // descr?: string;
        // deleted?: boolean;

        async createRole(data) {
            try {
                const res = await postRole(data);

                return res;
            } catch (error) {
                console.error((error as Error).message);
            }
        },

        async changeRole(data) {
            try {
                const res = await putRole(data);

                return res;
            } catch (error) {
                console.error((error as Error).message);
            }
        },

        async getCurrentRole(id: number) {
            try {
                const res = await getCurrentRole(id);

                return res;
            } catch (error) {
                console.error((error as Error).message);
            }
        },

        async deleteRole(id: number) {
            try {
                const res = await deleteRole(id);

                return res;
            } catch (error) {
                console.error((error as Error).message);
            }
        },

        async getRolePermission(id: number) {
            try {
                const res = await getRolePermission(id);

                this.permission = res.data;

                return res;
            } catch (error) {
                console.error((error as Error).message);
            }
        },

        async saveChangeRolePermission(id: number) {
            try {
                const res = await putRolePermission(id);

                console.log(res);

                return res;
            } catch (error) {
                console.error((error as Error).message);
            }
        },

        // ------TECH RADAR------------------------

        async getTechRadar() {
            try {
                const res = await getTechRadar();

                console.log('res', res);

                this.techRadarData = res.data?.content;
            } catch (error) {
                console.error((error as Error).message);
            }
        },
    };
};
