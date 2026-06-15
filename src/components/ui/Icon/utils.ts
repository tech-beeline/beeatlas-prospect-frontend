import type { CSSProperties } from 'react';

import { resolveAvatarColor } from '../Avatar/utils';
import type { AllStatuses, ColorTypes } from '../types';

import type { IconProps, IconSize, IconSizeProp } from './types';

export const resolveIconColor = ({
    color,
    type,
    componentName = 'Icon',
}: {
    color?: ColorTypes;
    type?: AllStatuses;
    componentName?: string;
}): ColorTypes => resolveAvatarColor({ color, type, componentName });

export const isNumericIconSize = (size: IconSizeProp): size is number => typeof size === 'number';

export const buildIconClassName = ({
    className,
    iconColor,
    isContained,
    size,
}: Pick<IconProps, 'className'> & {
    iconColor: ColorTypes;
    isContained: boolean;
    size: IconSizeProp;
}): string =>
    [
        'beeline-icons',
        'dsb_icon',
        isContained && 'dsb_icon--contained',
        isContained && `dsb_icon--${iconColor}`,
        !isContained && !isNumericIconSize(size) && `dsb_icon--${size}`,
        !isContained && `dsb_icon--sized--${iconColor}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

export const getNumericIconSizeStyle = (
    size: number,
): Pick<CSSProperties, 'width' | 'height' | 'fontSize' | 'lineHeight'> => ({
    width: size,
    height: size,
    fontSize: size,
    lineHeight: `${size}px`,
});

export const resolveNamedIconSize = (size: IconSizeProp): IconSize | undefined =>
    isNumericIconSize(size) ? undefined : size;
