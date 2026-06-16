import React, { forwardRef, useMemo } from 'react';

import { SkeletonProps } from './types';
import * as S from './units';
import { buildSkeletonClassName, resolveSkeletonMargins, resolveSkeletonWidth } from './utils';

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    (
        {
            variant = 'text',
            animated = true,
            className,
            radius,
            style,
            height,
            width,
            margin,
            ...props
        },
        ref,
    ) => {
        const resolvedWidth = useMemo(
            () => resolveSkeletonWidth(variant, width, height),
            [height, variant, width],
        );
        const resolvedMargins = useMemo(() => resolveSkeletonMargins(margin), [margin]);
        const resolvedClassName = useMemo(
            () => buildSkeletonClassName(variant, animated, className),
            [animated, className, variant],
        );
        const resolvedStyle = useMemo(
            () => ({
                ...style,
                ...resolvedMargins,
                borderRadius: radius,
                height,
                width: resolvedWidth,
            }),
            [style, resolvedMargins, radius, height, resolvedWidth],
        );

        return (
            <S.StyledSkeleton
                ref={ref}
                data-testid="Skeleton"
                role="progressbar"
                aria-valuetext="Loading"
                aria-busy="true"
                className={resolvedClassName}
                style={resolvedStyle}
                $variant={variant}
                $animated={animated}
                {...props}
            />
        );
    },
);

Skeleton.displayName = 'Skeleton';
