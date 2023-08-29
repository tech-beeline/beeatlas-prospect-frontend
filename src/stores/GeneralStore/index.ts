import { getCalendarData } from 'api/calendar';
import { getSearchResult } from 'api/fdm';
import { getProfiles } from 'api/personal-area';
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

    return {
        isAuth: isAuth || false,
        themeIsDark: themeIsDark || false,
        userInfo: userInfo || {},

        isLoadingSearch: false,
        resultSearch: [],
        resultTitle: '',

        techRadarData: [],

        profiles: [],

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

        // id: number
        // name?: string;
        // alias?: string;
        // descr?: string;
        // deleted?: boolean;

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
