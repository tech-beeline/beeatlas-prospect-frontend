import type { HTMLAttributes, ReactNode } from 'react';

export type CounterSize = 'small' | 'medium';

export interface CounterProps extends HTMLAttributes<HTMLDivElement> {
    count?: number | null;
    error?: boolean;
    hideBadgeContent?: boolean;
    warning?: boolean;
    tooltipTitle?: string;
    size?: CounterSize;
    children?: ReactNode;
    dataTestId?: string;
}

export interface StyledBadgeProps {
    $size: CounterSize;
    $error: boolean;
    $standalone: boolean;
}
