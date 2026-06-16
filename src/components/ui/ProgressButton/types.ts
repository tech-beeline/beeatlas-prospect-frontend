import type { ReactNode } from 'react';

import type { ButtonProps, ButtonSizeVariants, ResolvedButtonVariant } from '../Button/types';

export type ProgressButtonState = 'default' | 'loading' | 'success' | 'error';

export interface ProgressButtonProps extends Omit<ButtonProps, 'onClick'> {
    determinateMode?: boolean;
    progress?: number;
    statusDelayTime?: number;
    state?: ProgressButtonState;
    onClick?: () => void | Promise<unknown>;
}

export interface ProgressButtonSettings {
    width: number;
    height: number;
    startPos: number;
    strokeWidth: number;
    borderRadius: number;
}

export interface StyledProgressButtonProps {
    $loadingState: ProgressButtonState;
    $variant: ResolvedButtonVariant;
}

export interface ProgressContentProps {
    $isHidden: boolean;
}

export interface ProgressStatusProps {
    $isVisible: boolean;
}

export interface ProgressSvgPathProps {
    $loadingState: ProgressButtonState;
    $isIndeterminateLoading: boolean;
}

export interface ProgressStatusIconProps {
    $size: ButtonSizeVariants;
}

export type ProgressButtonIconSizeClass = Record<ButtonSizeVariants, string>;

export type ProgressButtonClickHandler = () => void | Promise<unknown>;

export type ProgressButtonChildren = ReactNode;
