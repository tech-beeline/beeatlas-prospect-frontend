import type { SkeletonMargin, SkeletonStyle, SkeletonValue, SkeletonVariant } from './types';

export const resolveSkeletonWidth = (
    variant: SkeletonVariant,
    width?: SkeletonValue,
    height?: SkeletonValue,
): SkeletonValue | undefined => {
    if ((variant === 'square' || variant === 'circle') && !width) {
        return height;
    }

    return width;
};

export const resolveSkeletonMargins = (margin?: SkeletonMargin): SkeletonStyle => {
    if (margin === undefined) {
        return {};
    }

    if (typeof margin === 'object') {
        return {
            marginBottom: margin.bottom,
            marginLeft: margin.left,
            marginRight: margin.right,
            marginTop: margin.top,
        };
    }

    return { margin };
};

export const buildSkeletonClassName = (
    variant: SkeletonVariant,
    animated: boolean,
    className?: string,
): string => {
    return [
        'dsb_skeleton',
        `dsb_skeleton__${variant}`,
        !animated && 'dsb_skeleton__no-animation',
        className,
    ]
        .filter(Boolean)
        .join(' ');
};
