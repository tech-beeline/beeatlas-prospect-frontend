import type { HTMLAttributes, ReactNode } from 'react';

import type { AllStatuses, ColorTypes } from '../types';

export type AvatarSize = 'small' | 'medium';
export type AvatarVariantType = 'square' | 'circle';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
    size?: AvatarSize;
    variant?: AvatarVariantType;
    /** @deprecated use `color` instead */
    type?: AllStatuses;
    src?: string;
    icon?: ReactNode;
    letter?: string;
    onClick?: () => void;
    color?: ColorTypes;
    hoverToCircle?: boolean;
    alt?: string;
}

export interface StyledAvatarProps {
    $size: AvatarSize;
    $variant: AvatarVariantType;
    $color: ColorTypes;
    $clickable: boolean;
    $hoverToCircle: boolean;
}
