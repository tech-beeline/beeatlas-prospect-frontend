import { cloneElement, isValidElement, ReactNode } from 'react';

import { BUTTON_ICON_SIZE, VARIANT_ALIAS_MAP } from './const';
import { ResolvedButtonVariant } from './types';

const isIconElement = (element: React.ReactElement): boolean =>
    typeof element.props === 'object' && element.props !== null && 'iconName' in element.props;

export const normalizeButtonIcon = (icon: ReactNode): ReactNode => {
    if (!isValidElement(icon) || !isIconElement(icon)) {
        return icon;
    }

    const { color: _color, type: _type, size: _size, style, ...restProps } = icon.props;

    return cloneElement(icon, {
        ...restProps,
        size: BUTTON_ICON_SIZE,
        style: { ...(style as React.CSSProperties), color: 'currentColor' },
    });
};

export const resolveVariant = (variant: string): ResolvedButtonVariant =>
    VARIANT_ALIAS_MAP[variant] ?? (variant as ResolvedButtonVariant);
