import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { ButtonSizeVariants } from '../Button/types';

export type IconButtonVariant = 'base' | 'outlined' | 'plain' | 'overlay';

type MergedHTMLAttributes = HTMLAttributes<HTMLElement> &
    ButtonHTMLAttributes<HTMLElement> &
    AnchorHTMLAttributes<HTMLElement>;

export interface IconButtonProps extends MergedHTMLAttributes {
    iconName: Icons;
    size?: ButtonSizeVariants;
    variant?: IconButtonVariant;
    'aria-label'?: string;
    'aria-hidden'?: boolean;
    href?: string;
    fullWidth?: boolean;
    dataTestId?: string;
}

export interface StyledIconButtonProps {
    $size: ButtonSizeVariants;
    $variant: IconButtonVariant;
}
