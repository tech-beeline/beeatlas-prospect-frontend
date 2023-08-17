import { runInAction } from 'mobx';

import { getGeneralItems, getItemChildren } from 'api/fdm';

import { IFDMStore, INestingMenuItem } from './types';
import { formatMenuData } from './utils';

export * from './types';

export const FDMStore = (): IFDMStore => {
    return {
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
        breadCrumbsIds: [],
        alreadyResponse: [],

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
            } else {
                // для последнего вложенного элемента, тк его не может быть в общем списке
                this.breadCrumbsFormat(this.activeFDMItem.parent);
            }

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

            console.log('breadCrumbsItems', this.breadCrumbsItems);
        },

        async findElementById(id: number, parentId: number) {
            // console.log('id', id);
            // отсеиваем корневой элемент
            // if (id !== 352) {
            //     this.breadCrumbsIds.unshift(id);
            // } else {
            //     return;
            // }

            // this.getGeneralMenuItems();

            const foundItem = this.generalMenuItems.find(
                (item: INestingMenuItem) => item.id === id,
            );

            console.log('foundItem', foundItem);

            if (foundItem) {
                this.setActiveFDMItem(foundItem);
            } else {
                const res = await this.getItemChildren(parentId, 2);
                console.log('resId', res);

                const foundItem = (res as Record<string, any>).find(
                    (item: INestingMenuItem) => item.id === id,
                );

                this.setActiveFDMItem(foundItem);

                console.log('foundItem2', foundItem);
            }

            // TODO: сделать из двух функций одну и вынести в utils

            // только для Экспанда
            this.treeExpandArray = [];
            this.handleCheckTreeExpandId(parentId);

            // хлебные крошки
            this.breadCrumbsIds = [];
            this.breadCrumbsItems = [];
            this.breadCrumbsFormat(this.activeFDMItem.id);
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
    };
};
