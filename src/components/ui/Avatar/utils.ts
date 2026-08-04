import type { KeyboardEvent } from 'react';
import { cloneElement, isValidElement, ReactNode } from 'react';

import type { AllStatuses, ColorTypes } from '../types';

import { DEFAULT_AVATAR_COLOR, STATUS_TO_COLOR_MAP } from './const';
import type { AvatarSize } from './types';

const isIconElement = (element: React.ReactElement): boolean =>
    typeof element.props === 'object' && element.props !== null && 'iconName' in element.props;

export const normalizeAvatarIcon = (icon: ReactNode, size: AvatarSize): ReactNode => {
    if (!isValidElement(icon) || !isIconElement(icon)) {
        return icon;
    }

    const { color: _color, type: _type, size: _size, style, ...restProps } = icon.props;

    return cloneElement(icon, {
        ...restProps,
        size,
        style: { ...(style as React.CSSProperties), color: 'currentColor' },
    });
};

export const resolveAvatarColor = ({
    color,
    type,
    componentName = 'Avatar',
}: {
    color?: ColorTypes;
    type?: AllStatuses;
    componentName?: string;
}): ColorTypes => {
    if (type) {
        console.warn(`[${componentName}] props "type" is deprecated, use "color" instead`);
        return color ?? STATUS_TO_COLOR_MAP[type] ?? DEFAULT_AVATAR_COLOR;
    }

    return color ?? DEFAULT_AVATAR_COLOR;
};

export const handleAvatarKeyDown = (
    event: KeyboardEvent<HTMLSpanElement>,
    onClick?: () => void,
): void => {
    if (!onClick) {
        return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
    }
};
