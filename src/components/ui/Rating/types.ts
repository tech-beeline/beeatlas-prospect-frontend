import type { HTMLAttributes, ReactNode } from 'react';

export type RatingItemType = 'star' | 'number' | ((index: number) => ReactNode);

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: number;
    item?: RatingItemType;
    maxIndex?: number;
    minIndex?: number;
    onChange?: (index: number) => void;
    onHover?: (index: number | null) => void;
    caption?: {
        left: string;
        right: string;
    };
    score?: ReactNode | string;
    className?: string;
    disabled?: boolean;
    readonly?: boolean;
    dataTestId?: string;
}
