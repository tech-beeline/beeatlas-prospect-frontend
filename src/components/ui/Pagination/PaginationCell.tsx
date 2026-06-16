import React, { FC } from 'react';

import type { PaginationCellProps } from './types';
import * as S from './units';

export const PaginationCell: FC<PaginationCellProps> = ({
    variant = 'text',
    active = false,
    startIcon,
    className,
    children,
    ...props
}) => {
    const baseClassName = [
        'dsb_pagination-cell',
        variant === 'text' && 'dsb_pagination-cell__text',
        variant === 'text' && active && 'dsb_pagination-cell__text-active',
        variant === 'icon' && 'dsb_pagination-cell__icon',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (variant === 'text') {
        return (
            <S.TextCell
                data-testid="PaginationCell"
                variant="outlined"
                className={baseClassName}
                $active={active}
                {...props}
            >
                {children}
            </S.TextCell>
        );
    }

    const isDots =
        className?.includes('dsb_pagination-cell__increase-dots') ||
        className?.includes('dsb_pagination-cell__decrease-dots');

    return (
        <S.IconCell
            data-testid="PaginationCell"
            className={baseClassName}
            $dots={isDots}
            startIcon={startIcon}
            {...props}
        />
    );
};
