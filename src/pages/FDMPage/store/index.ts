import { create } from 'zustand';

import { getGeneralItems, getItemChildren } from 'api/fdm';

import { IFDMStore } from './types';
import { findItemInTreeById, formatMenuItems, getItemPathAndBreadcrumbs } from './utils';

export const useFDMStore = create<IFDMStore>()((set, get) => ({
    activeItem: null,
    activeItemPath: [],
    breadcrumbs: [],
    flatItems: [],
    menuItems: [],
    requesetedDomainIds: [],

    setActiveItem: (itemId, level) => {
        set(() => {
            const foundItem = findItemInTreeById(get().menuItems, itemId, level);
            const { path, breadcrumbs } = getItemPathAndBreadcrumbs(get().menuItems, itemId, level);
            return { activeItem: foundItem, activeItemPath: path, breadcrumbs };
        });
    },

    clearActiveItem: () => {
        set(() => ({
            activeItem: null,
            activeItemPath: [],
            breadcrumbs: [],
            requesetedDomainIds: [],
        }));
    },

    getGroupsAndDomains: async () => {
        const res = await getGeneralItems();
        set(() => ({
            flatItems: [...res.data],
            menuItems: formatMenuItems([...res.data]),
        }));
    },

    getEntitiesByDomain: async (domainId: number) => {
        if (!get().requesetedDomainIds.includes(domainId)) {
            const res = await getItemChildren(domainId);

            const flatItemsWithChildren = get().flatItems.map((item) =>
                item.id === domainId ? { ...item, children: res.data ?? [] } : item,
            );

            set(() => ({
                flatItems: [...flatItemsWithChildren],
                menuItems: formatMenuItems([...flatItemsWithChildren]),
                requesetedDomainIds: [...get().requesetedDomainIds, domainId],
            }));

            return res.data.length > 0;
        }
        return true;
    },
}));
