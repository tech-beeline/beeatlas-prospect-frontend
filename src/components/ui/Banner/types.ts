import type { ReactNode } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export interface ButtonBannerProps {
    label: string;
    onClick?: () => void;
    startIcon?: ReactNode;
    variant?: 'overlay' | 'outlined';
}

export type BannerActions = ButtonBannerProps[] & {
    0?: ButtonBannerProps;
    1?: ButtonBannerProps;
};

export type ContainerColorVariants = 'info' | 'success' | 'warning' | 'error' | 'default';

export type BannerTypeVariants = 'horizontal' | 'vertical';

export interface BannerProps {
    title: ReactNode;
    color?: ContainerColorVariants;
    type?: BannerTypeVariants;
    actions?: BannerActions;
    onClose?: () => void;
    iconName?: Icons;
    className?: string;
}

export interface StyledBannerProps {
    $color: ContainerColorVariants;
    $type: BannerTypeVariants;
    $hasCloseButton: boolean;
}
