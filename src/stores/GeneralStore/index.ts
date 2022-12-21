import { runInAction } from 'mobx';

import { getCalendarData } from 'api/calendar';
import { getGeneralItems, getItemChildren, getSearchResult } from 'api/fdm';
import { getStorage, persistStorage, removeItemStorage } from 'stores/utils';

// TODO: вынести
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

        generalMenuItems: [],
        activeFDMItem: {} as INestingMenuItem,
        treeExpandArray: [],
        itemChildren: [],
        isItemChildren: true,
        isLoadingMenuItems: false,
        isLoadingChildren: false,
        menuTreeItems: [],
        breadCrumbsItems: [],
        alreadyResponse: [],

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

        setGeneralMenuItems(data: any[]) {
            this.generalMenuItems = data;
        },

        async getGeneralMenuItems() {
            try {
                this.setLoadingMenuItems(true);

                const res = await getGeneralItems();

                if (res.data.length > 0) {
                    this.setGeneralMenuItems(res.data);

                    this.setMenuTreeItems(formatMenuData(this.generalMenuItems));
                }
            } catch (error) {
                console.error((error as Error).message);
            } finally {
                this.setLoadingMenuItems(false);
            }
        },

        async handleCheckTreeExpandId(parent: number) {
            const topId = this.generalMenuItems.find(
                (item: INestingMenuItem) => item.id === parent,
            );

            !!topId && this.treeExpandArray.push(topId.id);

            if (topId?.parent) {
                this.handleCheckTreeExpandId(topId?.parent);
            } else {
                return;
            }
        },

        breadCrumbsFormat(id: number) {
            const element = this.generalMenuItems.find((item: INestingMenuItem) => item.id === id);

            !!element &&
                element?.id !== 352 &&
                this.breadCrumbsItems.unshift({ id: element.id, name: element.name });

            if (element?.parent) {
                this.breadCrumbsFormat(element?.parent);
            } else {
                return;
            }
            // this.breadCrumbsItems;
        },

        async setActiveFDMItem(item) {
            if (item.level === 3) {
                const res = await this.getItemChildren(item.id, item.level + 1);

                this.activeFDMItem = {
                    ...item,
                    // @ts-ignore
                    // isChildren: res?.length > 0,
                    // @ts-ignore
                    children: await res,
                };
            } else {
                this.activeFDMItem = item;
            }

            // TODO: сделать из двух функций одну и вынести в utils

            // только для Экспанда
            this.treeExpandArray = [];
            this.handleCheckTreeExpandId(item.parent);

            // хлебные крошки
            this.breadCrumbsItems = [];
            this.breadCrumbsFormat(item.id);
        },

        setLoadingMenuItems(bool) {
            this.isLoadingMenuItems = bool;
        },

        setLoadingChildren(bool) {
            this.isLoadingChildren = bool;
        },

        async getItemChildren(parentId, level) {
            this.itemChildren = [];

            // let data;
            // this.setLoadingChildren(true);

            if (this.alreadyResponse.includes(parentId)) {
                return;
            }

            try {
                const res = await getItemChildren(parentId);

                this.alreadyResponse.push(parentId);

                console.log('getItemChildren', res);

                if (res) {
                    // TODO: убрать
                    // if (!res.data.length) {
                    //     runInAction(() => {
                    //         this.isItemChildren = false;
                    //     });
                    // }
                    const resArr = res.data.map((item: any) => ({
                        ...item,
                        parent: parentId,
                        // isChildren: true,
                        level,
                    }));

                    // TODO: resArr взаимодействует только с первоначальным деревом
                    if (resArr.length > 0) {
                        this.setGeneralMenuItems([...this.generalMenuItems, ...resArr]);

                        this.setMenuTreeItems(formatMenuData(this.generalMenuItems));
                    }
                    // else {
                    //     this.setMenuTreeItems(formatMenuData([...this.menuTreeItems, ...resArr]));
                    // }

                    runInAction(() => {
                        this.itemChildren = resArr;
                    });

                    return resArr;

                    // data.length === 0 ? (this.resultSearch = 'nodata') : (this.resultSearch = data);
                }
                // else {
                //     this.isChildren = false;
                // }

                // return data;
            } catch (error) {
                console.error((error as Error).message);

                // TODO: убрать
                // this.resultSearch = 'nodata';
            } finally {
                // this.setLoadingChildren(false);
            }
        },

        setMenuTreeItems(data) {
            this.menuTreeItems = data;
        },
    };
};

// getItemChildren
