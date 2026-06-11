import type { CardBorderVariants, CardElevationVariants } from './types';

export const classNames = (...values: Array<string | false | null | undefined>) =>
    values.filter(Boolean).join(' ');

export const buildCardClassName = (
    border?: CardBorderVariants,
    elevation?: CardElevationVariants,
    className?: string,
) =>
    classNames(
        'dsb_card',
        'dsb_card-root',
        border && `dsb_card__border-${border}`,
        elevation && `dsb_card__elevation-${elevation}`,
        className,
    );
