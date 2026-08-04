import { Breadcrumb, Item, ItemTypes } from './types';

export const findItemInTree = (menuItems: Item[], id: number, type: ItemTypes): Item | null => {
    const stack: Item[] = [];
    stack.push(...menuItems);

    while (stack.length > 0) {
        const item = stack.pop();

        if (item?.id === id && item.type === type) {
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
    type: ItemTypes,
): { path: number[]; breadcrumbs: Breadcrumb[] } => {
    const path: number[] = [];
    const breadcrumbs: Breadcrumb[] = [];
    const item = findItemInTree(menuItems, id, type);

    if (item?.parent) {
        path.push(item.parent);
        breadcrumbs.unshift({ id: item.id, name: item.name, type: item.type });

        const { path: itemPath, breadcrumbs: itemBreadcrumbs } = getItemPathAndBreadcrumbs(
            menuItems,
            item.parent,
            ItemTypes.BUSINESS,
        );
        path.push(...itemPath);
        breadcrumbs.unshift(...itemBreadcrumbs);
    } else if (item?.id) {
        breadcrumbs.unshift({ id: item.id, name: item.name, type: item.type });
    }

    return { path, breadcrumbs };
};

export const removeItemFromTree = (items: Item[], id: number, type: ItemTypes): Item[] => {
    return items
        .filter((item) => !(item.id === id && item.type === type))
        .map((item) => {
            const hadDirectChildRemoved = item.children.some(
                (child) => child.id === id && child.type === type,
            );

            const newChildren = removeItemFromTree(item.children, id, type);

            if (hadDirectChildRemoved && newChildren.length === 0) {
                return {
                    ...item,
                    children: newChildren,
                    hasChildren: false,
                };
            }

            return {
                ...item,
                children: newChildren,
            };
        });
};
