import type { HTMLAttributes } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { AllStatuses, ColorTypes } from '../types';

export type IconSize = 'small' | 'medium' | 'large';
export type IconSizeProp = IconSize | number;

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
    /** Размер иконки */
    size?: IconSizeProp;
    /**
     * Цвет иконки и цвет фона
     * @deprecated use `color` instead
     */
    type?: AllStatuses;
    /** Если указан `type`, `contained` включается по умолчанию */
    contained?: boolean;
    /** Имя значка из iconfont */
    iconName: Icons;
    className?: string;
    /** Цвет иконки и цвет фона */
    color?: ColorTypes;
    dataTestId?: string;
}

export interface StyledIconProps {
    $isContained: boolean;
    $color: ColorTypes;
    $size?: IconSize;
}
