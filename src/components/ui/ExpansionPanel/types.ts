import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export interface ExpansionPanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    open?: boolean;
    title: string | ReactNode;
    subTitle?: string | ReactNode;
    description?: string | ReactNode;
    onOpen?: MouseEventHandler;
    onClose?: MouseEventHandler;
    className?: string;
    iconName?: Icons;
    titleClassName?: string;
    bodyClassName?: string;
    customButton?: ReactNode;
    children?: ReactNode;
}

export interface ExpansionPanelTitleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open?: boolean;
    title?: string | ReactNode;
    subTitle?: string | ReactNode;
    description?: string | ReactNode;
    iconName?: Icons;
    customButton?: ReactNode;
    onClick?: MouseEventHandler;
}
