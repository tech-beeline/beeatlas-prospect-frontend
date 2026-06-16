import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export interface TabSelectedData {
    tabBody: ReactNode;
    tabElement: HTMLDivElement | null;
    tabProps?: TabProps;
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    value?: any;
    onClick?: (value: any) => void;
    disabled?: boolean;
    iconName?: Icons;
    children?: ReactNode;
    className?: string;
    routingComponent?: ReactElement;
    bodyClassName?: string;
    /** Инжектируется родительским Tabs */
    selected?: boolean;
    /** Инжектируется родительским Tabs */
    onSelected?: (data: TabSelectedData) => void;
    /** Инжектируется родительским Tabs */
    index?: number;
}
