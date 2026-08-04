import React, { forwardRef } from 'react';

import type { ToolbarItemProps } from './types';
import * as S from './units';
import { getIconSizeClassName } from './utils';

export const ToolbarItem = forwardRef<HTMLDivElement, ToolbarItemProps>(
    (
        {
            label,
            icon,
            selected = false,
            disabled = false,
            onClick,
            size = 'medium',
            menu: _menu,
            ...props
        },
        ref,
    ) => (
        <S.Item
            ref={ref}
            className={[
                'dsb_toolbar__item',
                `dsb_toolbar__item-${size}`,
                disabled && 'dsb_toolbar__item-disabled',
                selected && 'dsb_toolbar__item-selected',
            ]
                .filter(Boolean)
                .join(' ')}
            onClick={disabled ? undefined : onClick}
            $size={size}
            $selected={selected}
            $disabled={disabled}
            {...props}
        >
            {icon && (
                <S.IconGlyph
                    className={['beeline-icons', 'dsb_icon', getIconSizeClassName(size)]
                        .filter(Boolean)
                        .join(' ')}
                    role="img"
                    aria-hidden="true"
                    translate="no"
                    $size={size}
                    $color={icon.color}
                >
                    {icon.iconName}
                </S.IconGlyph>
            )}
            {label && <S.Label>{label}</S.Label>}
        </S.Item>
    ),
);

ToolbarItem.displayName = 'ToolbarItem';
