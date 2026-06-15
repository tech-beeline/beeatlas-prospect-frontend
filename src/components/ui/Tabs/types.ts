import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

import type { TabProps } from '../Tab/types';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    selectedTabIndex?: number;
    onChange?: (index: number) => void;
    className?: string;
    bodyClassName?: string;
    children?: ReactNode;
    /** @deprecated */
    divider?: boolean;
    /** @deprecated */
    align?: string;
}

export interface UseTabsParams {
    onChange?: (index: number) => void;
    selectedTabIndex?: number;
    tabs: ReactElement<TabProps>[];
}

export interface TabData {
    tabBody: ReactNode;
    tabElement: HTMLDivElement | null;
    tabProps?: TabProps;
}

export interface UseTabsData {
    tabs: ReactElement[];
    currentTabIndex: number;
    currentTabData: TabData;
    prevTabData: TabData;
}

export interface TabsScrollEvent {
    scrollLeft: number;
    scrollTop: number;
}

export interface TabsScrollerProps {
    className?: string;
    children: ReactNode;
    onScroll: (event: TabsScrollEvent) => void;
}

export interface TabsIndicatorStyle {
    left: number;
    width: number | 'auto';
    right?: number;
}
