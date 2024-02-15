import { Breadcrumb, Item } from './types';

/*
    Параметр level, приходящий с бэка, не отражает реальный уровень вложенности
    Параметр parent, приходящий с бэка, не указывает на домен
*/
const formatDomainChildrenLevels = (items: Item[], level: number, parent: number): Item[] => {
    return items.map((item) => ({
        ...item,
        level,
        parent,
        children: formatDomainChildrenLevels(item.children ?? [], level + 1, item.id),
    }));
};

export const formatMenuItems = (items: Item[], id = 0, level = 1): Item[] => {
    return items
        .filter((item) => item.parent === id)
        .map((item) => ({
            ...item,
            level,
            children: item.children
                ? formatDomainChildrenLevels(item.children, level + 1, item.id)
                : formatMenuItems(items, item.id, level + 1),
        }));
};

export const findItemInTreeById = (menuItems: Item[], id: number, level: number): Item | null => {
    const stack: Item[] = [];
    stack.push(...menuItems);

    while (stack.length > 0) {
        const item = stack.pop();

        if (item?.id === id) {
            if (level) {
                if (item.level === level) {
                    return item;
                } else {
                    return null;
                }
            }
            return item;
        } else if (item?.children && item.children.length) {
            stack.push(...item.children);
        }
    }
    return null;
};

export const getItemPathAndBreadcrumbs = (
    menuItems: Item[],
    id: number,
    level: number,
): { path: number[]; breadcrumbs: Breadcrumb[] } => {
    const path: number[] = [];
    const breadcrumbs: Breadcrumb[] = [];
    const item = findItemInTreeById(menuItems, id, level);
    if (item?.parent && item.parent !== 0) {
        path.push(item.parent);

        const isTypeDMN = item.alias?.split('.')[0] === 'DMN';
        let itemDomain = {};
        if (item.domain_ref) {
            itemDomain = { domainId: String(item.domain_ref.id) };
        }
        if (isTypeDMN) {
            itemDomain = { domainId: String(item.id) };
        }
        breadcrumbs.unshift({ id: item.id, level: item.level, name: item.name, ...itemDomain });

        const { path: itemPath, breadcrumbs: itemBreadcrumbs } = getItemPathAndBreadcrumbs(
            menuItems,
            item.parent,
            level ? level - 1 : 0,
        );
        path.push(...itemPath);
        breadcrumbs.unshift(...itemBreadcrumbs);
    }

    return { path, breadcrumbs };
};
