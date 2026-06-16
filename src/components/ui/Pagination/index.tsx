import React, { FC, useMemo } from 'react';

import { DEFAULT_COLLAPSED, DEFAULT_COUNT, DEFAULT_PAGE, DEFAULT_SIBLING_COUNT } from './const';
import { PaginationCollapsible } from './PaginationCollapsible';
import { PaginationStandard } from './PaginationStandard';
import type { PaginationProps } from './types';
import { calcCount, calcPage, calcSiblingCount } from './utils';

export const Pagination: FC<PaginationProps> = ({
    count = DEFAULT_COUNT,
    page = DEFAULT_PAGE,
    siblingCount = DEFAULT_SIBLING_COUNT,
    collapsed = DEFAULT_COLLAPSED,
    onChange,
    ...props
}) => {
    const calcedCount = useMemo(() => calcCount(count), [count]);
    const calcedSiblingCount = useMemo(
        () => calcSiblingCount(count, siblingCount),
        [count, siblingCount],
    );
    const calcedPage = useMemo(() => calcPage(count, page), [count, page]);

    return (
        <>
            {collapsed && (
                <PaginationCollapsible
                    data-testid="Pagination"
                    count={calcedCount}
                    page={calcedPage}
                    onChange={onChange}
                    siblingCount={calcedSiblingCount}
                    {...props}
                />
            )}
            {!collapsed && (
                <PaginationStandard
                    data-testid="Pagination"
                    count={calcedCount}
                    page={calcedPage}
                    onChange={onChange}
                    {...props}
                />
            )}
        </>
    );
};

Pagination.displayName = 'Pagination';
