import type { HTMLAttributes, ReactNode } from 'react';

import type { ButtonProps } from '../Button/types';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> {
    count: number;
    collapsed?: boolean;
    page?: number;
    onChange?: (index: number) => void;
    siblingCount?: number;
}

export interface PaginationCollapsibleProps extends Omit<PaginationProps, 'collapsed'> {}

export interface PaginationStandardProps
    extends Omit<PaginationProps, 'siblingCount' | 'collapsed'> {}

export interface PaginationCellProps extends Omit<ButtonProps, 'variant'> {
    variant: 'text' | 'icon';
    active?: boolean;
}

export interface PaginationIconProps {
    icon: ReactNode;
}
