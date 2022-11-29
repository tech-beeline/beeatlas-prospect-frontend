import { runInAction } from 'mobx';

import { getCalendarData } from 'api/calendar';
import { getItemChildren, getSearchResult } from 'api/fdm';
import { getStorage, persistStorage, removeItemStorage } from 'stores/utils';

// TODO: вынести
import menuStaticData from './groups.json';
import { IGeneralStore, INestingMenuItem } from './types';
import { formatMenuData } from './utils';

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
        itemChildren: [],
        isLoadingChildren: false,

        // @ts-ignore
        menuConfig: [],

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

        handleCheckTreeExpandId(parent: number) {
            const topId = menuStaticData.find((item) => item.id === parent);

            !!topId && this.treeExpandArray.push(topId.id);

            if (topId?.parent) {
                this.handleCheckTreeExpandId(topId?.parent);
            } else {
                return;
            }
        },

        setActiveFDMItem(item) {
            this.activeFDMItem = item;

            this.treeExpandArray = [];

            this.handleCheckTreeExpandId(item.parent);
        },

        setLoadingChildren(isLoadingChildren) {
            this.isLoadingChildren = isLoadingChildren;
        },

        async getItemChildren(parentId, level) {
            this.itemChildren = [];

            this.setLoadingChildren(true);

            // let data;

            try {
                const res = await getItemChildren(parentId);

                if (res) {
                    const data = await res.data;

                    const resArr = data.map((item: any) => ({
                        ...item,
                        id: item.objectId,
                        parent: parentId,
                        level,
                    }));

                    // @ts-ignore
                    this.setMenuConfig(formatMenuData([...menuStaticData, ...resArr]));

                    runInAction(() => {
                        this.itemChildren = resArr;
                    });

                    // data.length === 0 ? (this.resultSearch = 'nodata') : (this.resultSearch = data);
                } else {
                    // TODO: убрать
                    // this.resultSearch = 'nodata';
                }

                // return data;
            } catch (error) {
                console.error((error as Error).message);

                // TODO: убрать
                // this.resultSearch = 'nodata';
            } finally {
                this.setLoadingChildren(false);
            }
        },

        // @ts-ignore
        setMenuConfig(data) {
            // @ts-ignore
            this.menuConfig = data;
        },
    };
};

// getItemChildren
