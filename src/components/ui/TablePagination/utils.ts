import { useEffect, useMemo, useState } from 'react';

import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE, DEFAULT_ROWS_PER_PAGE_OPTIONS } from './const';
import type { TablePaginationProps } from './types';

export const getPageCount = (rowsCount: number, rowsPerPage: number): number =>
    Math.max(0, Math.ceil(rowsCount / rowsPerPage));

export const buildShowedRange = (page: number, rowsPerPage: number, rowsCount: number): string =>
    `${page * rowsPerPage - rowsPerPage + 1}-${Math.min(rowsPerPage * page, rowsCount)}`;

export const buildTablePaginationClassName = ({
    className,
    isExtraSmallDevice,
}: {
    className?: string;
    isExtraSmallDevice: boolean;
}): string =>
    ['dsb_table-pagination', className, isExtraSmallDevice && 'dsb_table-pagination-mobile']
        .filter(Boolean)
        .join(' ');

export const calcPageOnRowsPerPageChange = (
    page: number,
    currentRowsPerPage: number,
    newRowsPerPage: number,
): number => {
    if (page <= 1) {
        return page;
    }

    return Math.ceil(((page - 1) * currentRowsPerPage + 1) / newRowsPerPage);
};

type UseTablePaginationParams = Pick<
    TablePaginationProps,
    | 'rowsCount'
    | 'page'
    | 'rowsPerPage'
    | 'rowsPerPageOptions'
    | 'onPageChange'
    | 'onRowsPerPageChange'
    | 'onUserActions'
>;

export const useTablePagination = ({
    rowsCount,
    page = DEFAULT_PAGE,
    rowsPerPage = DEFAULT_ROWS_PER_PAGE,
    rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
    onPageChange,
    onRowsPerPageChange,
    onUserActions,
}: UseTablePaginationParams) => {
    useEffect(() => {
        if (onPageChange) {
            console.warn(
                '[TablePagination] props "onPageChange" is deprecated, use "onUserActions" instead',
            );
        }

        if (onRowsPerPageChange) {
            console.warn(
                '[TablePagination] props "onRowsPerPageChange" is deprecated, use "onUserActions" instead',
            );
        }
    }, [onPageChange, onRowsPerPageChange]);

    const [internalRowsPerPage, setInternalRowsPerPage] = useState(rowsPerPage);
    const [pagesCount, setPagesCount] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([rowsPerPage]);

    const showedRange = useMemo(
        () => buildShowedRange(page, internalRowsPerPage, rowsCount),
        [page, internalRowsPerPage, rowsCount],
    );

    useEffect(() => {
        setPagesCount(getPageCount(rowsCount, rowsPerPage));
        setSelectedOptions([rowsPerPage]);
        setInternalRowsPerPage(rowsPerPage);
    }, [rowsPerPage, rowsCount]);

    const emitUserActions = (nextPage: number, nextRowsPerPage: number) => {
        onUserActions?.({
            page: nextPage,
            rowsPerPage: nextRowsPerPage,
        });
    };

    const handleRowsPerPageChange = (values: string[]) => {
        const currentRowsPerPage = Number(values[0]);
        setSelectedOptions([currentRowsPerPage]);
        setInternalRowsPerPage(currentRowsPerPage);
        setPagesCount(getPageCount(rowsCount, currentRowsPerPage));

        const newPage = calcPageOnRowsPerPageChange(page, internalRowsPerPage, currentRowsPerPage);

        emitUserActions(newPage, currentRowsPerPage);
        onPageChange?.(newPage);
        onRowsPerPageChange?.(currentRowsPerPage);
    };

    const handleSetFirstPage = () => {
        onPageChange?.(1);
        emitUserActions(1, rowsPerPage);
    };

    const handleSetLastPage = () => {
        onPageChange?.(pagesCount);
        emitUserActions(pagesCount, rowsPerPage);
    };

    const handleForwardClick = () => {
        const newPage = Math.min(page + 1, pagesCount);
        onPageChange?.(newPage);
        emitUserActions(newPage, rowsPerPage);
    };

    const handleBackwardClick = () => {
        const newPage = Math.max(page - 1, 1);
        onPageChange?.(newPage);
        emitUserActions(newPage, rowsPerPage);
    };

    return {
        rowsPerPageOptions,
        pagesCount,
        selectedOptions,
        showedRange,
        handleRowsPerPageChange,
        handleSetFirstPage,
        handleSetLastPage,
        handleForwardClick,
        handleBackwardClick,
    };
};
