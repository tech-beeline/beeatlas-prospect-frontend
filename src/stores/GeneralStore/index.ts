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
        // TODO: нужно ли уже?
        itemChildren: [],
        isItemChildren: true,
        isLoadingMenuItems: false,
        isLoadingChildren: false,
        menuTreeItems: [],
        breadCrumbsItems: [],
        alreadyResponse: [],
        breadCrumbsIds: [],

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
            // отсеиваем корневой элемент
            if (id !== 352) {
                this.breadCrumbsIds.unshift(id);
            } else {
                return;
            }

            const foundItem = this.generalMenuItems.find(
                (item: INestingMenuItem) => item.id === id,
            );

            if (foundItem) {
                this.breadCrumbsFormat(foundItem.parent);
            }
            // else {
            //     // для последнего вложенного элемента, тк его не может быть в общем списке
            //     this.breadCrumbsFormat(this.activeFDMItem.parent);
            // }

            let tempArr = [...this.menuTreeItems];
            let actualItem = {};

            this.breadCrumbsIds.forEach((breadCrumbsId) => {
                tempArr.forEach((menuItem) => {
                    if (breadCrumbsId === menuItem.id) {
                        // пушу в массив найденный объект
                        this.breadCrumbsItems.push(menuItem);

                        actualItem = { ...menuItem };

                        // break из цикла
                        return;
                    }
                });

                // подставить children найденного элемента
                // вместо menuTreeItems
                // @ts-ignore
                if (actualItem.children) {
                    // @ts-ignore
                    tempArr = [...actualItem.children];
                }

                // console.log('breadCrumbsFormat:tempArr', tempArr);

                return;
            });

            // убираю повторяющиеся элемента
            // TODO: фикс чтоб из не возникало
            const res = [...new Set(this.breadCrumbsItems)];

            this.breadCrumbsItems = res;
        },

        async setActiveFDMItem(item) {
            const aliasType = item.alias?.split('.')[0];

            // console.log('setActiveFDMItem: item', item);

            try {
                if (aliasType === 'DMN') {
                    const res = await this.getItemChildren(item.id, item.level + 1);

                    // console.log('setActiveFDMItem: res', res);

                    this.activeFDMItem = {
                        ...item,
                        // @ts-ignore
                        children: res,
                    };
                } else {
                    this.activeFDMItem = item;
                }

                // TODO: сделать из двух функций одну и вынести в utils

                // только для Экспанда
                this.treeExpandArray = [];
                this.handleCheckTreeExpandId(item.parent);

                // хлебные крошки
                this.breadCrumbsIds = [];
                this.breadCrumbsItems = [];
                this.breadCrumbsFormat(this.activeFDMItem.id);
            } catch (e) {
                console.log('CATCH:', e);
            }
        },

        setLoadingMenuItems(bool) {
            this.isLoadingMenuItems = bool;
        },

        setLoadingChildren(bool) {
            this.isLoadingChildren = bool;
        },

        // TODO: рефакторинг
        async getItemChildren(parentId, level) {
            this.itemChildren = [];

            // let data;
            // this.setLoadingChildren(true);

            try {
                const res = await getItemChildren(parentId);

                if (res) {
                    // TODO: убрать
                    // if (!res.data.length) {
                    //     runInAction(() => {
                    //         this.isItemChildren = false;
                    //     });
                    // }
                    const resArr = res.data.map((item: INestingMenuItem) => ({
                        ...item,
                        parent: parentId,
                        level,
                    }));

                    // TODO: resArr взаимодействует только с первоначальным деревом
                    if (resArr.length > 0) {
                        // проверка на (1)
                        this.alreadyResponse.includes(parentId)
                            ? this.setGeneralMenuItems([...this.generalMenuItems])
                            : this.setGeneralMenuItems([...this.generalMenuItems, ...resArr]);

                        // (1): пушим айди того элемента, чьи чилдрены уже добавлялись в общий массив
                        // чтобы не делать этого снова и избежать дублирования элементов
                        this.alreadyResponse.push(parentId);

                        this.setMenuTreeItems(formatMenuData(this.generalMenuItems));
                    }
                    // else {
                    //     this.setMenuTreeItems(formatMenuData([...this.menuTreeItems, ...resArr]));
                    // }

                    runInAction(() => {
                        // const res = [...new Set(this.breadCrumbsItems)];
                        // this.itemChildren = resArr;
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

        // ------PERSONAL AREA------------------------
    };
};
