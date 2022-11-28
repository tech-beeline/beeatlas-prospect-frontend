import { getCalendarData } from 'api/calendar';
import { getSearchResult } from 'api/fdm';
// TODO: вынести
import menuStaticData from 'pages/FDMPage/NestingMenu/groups.json';
import { getStorage, persistStorage, removeItemStorage } from 'stores/utils';

import { IGeneralStore, INestingMenuItem } from './types';

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

        activeFDMItem: {} as INestingMenuItem,
        treeExpandArray: [],

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

        // @ts-ignore
        handleCheckTreeExpandId(parent: number) {
            console.log('parent', parent);

            const topId = menuStaticData.find((item) => item.id === parent);

            !!topId && this.treeExpandArray.push(topId.id);

            if (topId?.parent) {
                this.handleCheckTreeExpandId(topId?.parent);
            } else {
                return;
            }

            // console.log('topId', topId);
        },

        setActiveFDMItem(item) {
            this.activeFDMItem = item;

            this.treeExpandArray = [];

            this.handleCheckTreeExpandId(item.parent);

            console.log('this.treeExpandArray', this.treeExpandArray);
        },
    };
};
