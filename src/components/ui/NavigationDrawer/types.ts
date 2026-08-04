import type { ReactNode } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export interface GroupItem {
    name: string;
    path: string;
    icon?: Icons;
    disabled?: boolean;
    disableActive?: boolean;
    href?: string;
    target?: string;
    rel?: string;
    isLoading?: boolean;
    children?: GroupItem[];
}

export interface Groups {
    title?: ReactNode;
    items: GroupItem[];
}

export interface NavigationDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    groups: Groups[];
    isGroupTitle?: boolean;
    isGroupDivider?: boolean;
    active?: string;
    bottom?: Groups[];
    onClickItem?: (name: string) => void;
    mobileOnOutsideClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    disableMobileView?: boolean;
    expandedItems?: Record<string, boolean>;
    onExpandedItemsChange?: (expandedItems: Record<string, boolean>) => void;
    defaultExpandedItems?: Record<string, boolean>;
}

export interface NavigationItemSkeletonProps {
    className?: string;
    isChild?: boolean;
    animated?: boolean;
}

export interface NavigationDrawerListProps {
    lists?: Groups[];
    prevItemsCount?: number;
    level?: number;
    isGroupTitle: boolean;
    isGroupDivider: boolean;
    isExpanded: boolean;
    activeItem: string;
    expandedItems: Record<string, boolean>;
    recentlyLoadedItems: Set<string>;
    onItemClick: (path: string, level?: number) => void;
    onToggleExpanded: (path: string) => void;
    onOpen?: () => void;
    isControlled: boolean;
    setIsExpanded: (value: boolean | ((prev: boolean) => boolean)) => void;
    wrapWithList?: boolean;
}
