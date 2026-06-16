import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type ButtonColorVariants =
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'inverse'
    | 'danger'
    | 'accent-black'
    | 'accent-white'
    | 'contained'
    | 'outlined'
    | 'plain'
    | 'overlay';

export type ButtonSizeVariants = 'small' | 'medium' | 'large';

export type ResolvedButtonVariant =
    | 'contained'
    | 'outlined'
    | 'plain'
    | 'overlay'
    | 'danger'
    | 'accent-black'
    | 'accent-white';

type MergedHTMLAttributes = HTMLAttributes<HTMLElement> &
    ButtonHTMLAttributes<HTMLElement> &
    AnchorHTMLAttributes<HTMLElement>;

export interface ButtonProps extends MergedHTMLAttributes {
    variant?: ButtonColorVariants;
    href?: string;
    size?: ButtonSizeVariants;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    fullWidth?: boolean;
    dataTestId?: string;
}

export interface StyledButtonProps {
    $size: ButtonSizeVariants;
    $variant: ResolvedButtonVariant;
    $hasStartIcon: boolean;
    $hasEndIcon: boolean;
    $fullWidth: boolean;
    $isIconButton: boolean;
    $isLink: boolean;
}
