import type { HTMLAttributes } from 'react';

export type CardBorderVariants = 'default' | 'brand';

export type CardElevationVariants = 'low' | 'medium' | 'high';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    border?: CardBorderVariants;
    elevation?: CardElevationVariants;
}
