import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { ColorTypes } from '../types';

export type ToolbarItemSize = 'medium' | 'large';

export interface ToolbarItemMenuItem {
    title: string;
    iconName?: Icons;
    subtitle?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export interface ToolbarItemProps {
    label?: string;
    icon?: {
        iconName: Icons;
        color?: ColorTypes;
    };
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    size?: ToolbarItemSize;
    menu?: {
        isOpen: boolean;
        items?: ToolbarItemMenuItem[];
        onOutsideClick?: () => void;
        onItemClick?: () => void;
    };
}

export interface StyledToolbarItemProps {
    $size: ToolbarItemSize;
    $selected: boolean;
    $disabled: boolean;
}

export interface StyledIconGlyphProps {
    $size: ToolbarItemSize;
    $color?: ColorTypes;
}
