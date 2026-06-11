import React from 'react';

import { Skeleton } from '../Skeleton';

import type { NavigationItemSkeletonProps } from './types';
import * as S from './units';
import { classNames } from './utils';

export const NavigationItemSkeleton = ({
    className,
    isChild = false,
    animated = true,
}: NavigationItemSkeletonProps) => (
    <S.NavigationItemSkeletonRoot
        className={classNames(
            'navigation-item-skeleton',
            { 'navigation-item-skeleton--child': isChild },
            className,
        )}
    >
        <Skeleton
            variant="circle"
            width={24}
            height={24}
            animated={animated}
            className="navigation-item-skeleton__icon"
        />
        <Skeleton
            variant="line"
            height={24}
            width="60%"
            animated={animated}
            className="navigation-item-skeleton__text"
        />
    </S.NavigationItemSkeletonRoot>
);
