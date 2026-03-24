import { create } from 'zustand';

import {
    getBusinessCapabilityChildren,
    getBusinessCapabilityParents,
    getCoreBusinessCapabilities,
    getTechCapabilityById,
} from 'api/capability';

import { DomainData, IFDMStore, Item, ItemTypes } from './types';
import { findItemInTree, getItemPathAndBreadcrumbs, removeItemFromTree } from './utils';

export const useFDMStore = create<IFDMStore>()((set, get) => ({
    activeItem: null,
    path: [],
    breadcrumbs: [],
    items: [],
    requestedCapabilities: [],
    loading: false,

    setActiveItem: (itemId, type) => {
        const foundItem = findItemInTree(get().items, itemId, type);
        const { path, breadcrumbs } = getItemPathAndBreadcrumbs(get().items, itemId, type);
        set(() => ({
            activeItem: foundItem,
            path: path,
            breadcrumbs: breadcrumbs,
        }));
    },

    clearActiveItem: () => {
        set(() => ({
            activeItem: null,
            path: [],
            breadcrumbs: [],
            requestedCapabilities: [],
        }));
    },

    getCoreCababilities: async () => {
        set(() => ({ loading: true }));
        try {
            const res = await getCoreBusinessCapabilities();
            set(() => ({
                items: [
                    ...res.data.map((capability) => ({
                        ...capability,
                        type: ItemTypes.BUSINESS,
                        children: [] as Item[],
                        parent: null,
                    })),
                ],
            }));
        } catch (e) {
            console.log(e);
        } finally {
            set(() => ({ loading: false }));
        }
    },

    getParentCapabilities: async (id, type) => {
        const ids = [];
        set(() => ({ loading: true }));
        try {
            if (type === ItemTypes.BUSINESS) {
                const res = await getBusinessCapabilityParents(id);
                ids.push(...res.data.parents);
            }

            if (type === ItemTypes.TECH) {
                const techCapability = await getTechCapabilityById(id);
                const parentId = techCapability.data.parents[0]?.id;
                const res = await getBusinessCapabilityParents(parentId);
                ids.push(...res.data.parents, parentId);
            }

            for (const id of ids) {
                await get().getСhildrenСapabilities(id);
            }

            if (type === ItemTypes.BUSINESS) {
                await get().getСhildrenСapabilities(id);
            }
        } catch (e) {
            console.log(e);
        } finally {
            set(() => ({ loading: false }));
        }
    },

    getСhildrenСapabilities: async (id) => {
        const treeItems = [...get().items];
        const item = findItemInTree(treeItems, id, ItemTypes.BUSINESS);

        if (item && !get().requestedCapabilities.includes(item.type + item.id)) {
            let domainData: DomainData;

            if (item.isDomain && item.parent !== null) {
                domainData = { id: item.id, name: item.name };
            } else if (item.domainData) {
                domainData = item.domainData;
            }

            const res = await getBusinessCapabilityChildren(id);
            const children: Item[] = [
                ...res.data.businessCapabilities.map((capability) => ({
                    ...capability,
                    type: ItemTypes.BUSINESS,
                    children: [] as Item[],
                    parent: id,
                    domainData,
                })),
                ...res.data.techCapabilities.map((capability) => ({
                    ...capability,
                    type: ItemTypes.TECH,
                    children: [] as Item[],
                    parent: id,
                    domainData,
                })),
            ];

            if (item) {
                item.children = [...children];
            }

            set(() => ({
                items: treeItems,
                requestedCapabilities: [...get().requestedCapabilities, item.type + item.id],
            }));
        }
    },

    removeItem: (id, type) => {
        set(() => ({
            items: removeItemFromTree(get().items, id, type),
        }));
    },
}));
