import { ReactNode } from 'react';

export interface IOverflowListItem {
    id: string | number;
}

export interface IOverflowListProps<T extends IOverflowListItem> {
    items: T[];
    renderItem: (item: T) => ReactNode;
    commaSeparated?: boolean;
    renderOverflowPopover?: (hiddenItems: T[]) => ReactNode;
}
