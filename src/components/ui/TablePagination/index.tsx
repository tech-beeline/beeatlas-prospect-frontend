import React, { FC } from 'react';

import { IconButton } from 'components/ui';
import { Select } from 'components/ui/Select';
import { Typography } from 'components/ui/Typography';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import {
    DEFAULT_PAGE,
    DEFAULT_ROWS_PER_PAGE,
    DEFAULT_ROWS_PER_PAGE_LABEL,
    DEFAULT_ROWS_PER_PAGE_OPTIONS,
} from './const';
import type { TablePaginationProps } from './types';
import * as S from './units';
import { buildTablePaginationClassName, useTablePagination } from './utils';

export const TablePagination: FC<TablePaginationProps> = ({
    label,
    rowsCount,
    page = DEFAULT_PAGE,
    rowsPerPage = DEFAULT_ROWS_PER_PAGE,
    rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
    onPageChange,
    onRowsPerPageChange,
    onUserActions,
    showFirstAndLastButtons = false,
    className,
    ...props
}) => {
    const isExtraSmallDevice = S.useIsExtraSmallDevice();
    const {
        pagesCount,
        selectedOptions,
        showedRange,
        handleRowsPerPageChange,
        handleSetFirstPage,
        handleSetLastPage,
        handleForwardClick,
        handleBackwardClick,
    } = useTablePagination({
        rowsCount,
        page,
        rowsPerPage,
        rowsPerPageOptions,
        onPageChange,
        onRowsPerPageChange,
        onUserActions,
    });

    const resolvedClassName = buildTablePaginationClassName({
        className,
        isExtraSmallDevice,
    });

    return (
        <S.StyledTablePagination
            data-testid="TablePagination"
            className={resolvedClassName}
            {...props}
        >
            {!isExtraSmallDevice &&
                (label || (
                    <Typography variant="body3" className="dsb_table-pagination-rows-per-page-text">
                        {DEFAULT_ROWS_PER_PAGE_LABEL}
                    </Typography>
                ))}

            <Select
                size="small"
                className="dsb_table-pagination-rows-per-page-select"
                values={selectedOptions.map((value) => value.toString())}
                options={rowsPerPageOptions.map((option) => option.toString())}
                onChange={handleRowsPerPageChange}
                showTooltip={false}
                renderValue={
                    isExtraSmallDevice
                        ? (values) => `${values.join('')} из ${rowsCount}`
                        : undefined
                }
            />

            {!isExtraSmallDevice && (
                <Typography className="dsb_table-pagination-pages-count" variant="body3">
                    {`${showedRange} из ${rowsCount}`}
                </Typography>
            )}

            <div className="dsb_table-pagination__controls">
                {showFirstAndLastButtons && (
                    <IconButton
                        className="dsb_table-pagination-scroll-first"
                        disabled={page === 1}
                        iconName={Icons.FastArrowLeft}
                        size="large"
                        onClick={handleSetFirstPage}
                    />
                )}

                <IconButton
                    className="dsb_table-pagination-scroll-backward"
                    disabled={page === 1}
                    iconName={Icons.ArrowLeft}
                    size="large"
                    onClick={handleBackwardClick}
                />

                {isExtraSmallDevice && (
                    <Typography className="dsb_table-pagination-pages-count" variant="body3">
                        {showedRange}
                    </Typography>
                )}

                <IconButton
                    className="dsb_table-pagination-scroll-forward"
                    disabled={page === pagesCount}
                    iconName={Icons.ArrowRight}
                    size="large"
                    onClick={handleForwardClick}
                />

                {showFirstAndLastButtons && (
                    <IconButton
                        className="dsb_table-pagination-scroll-last"
                        disabled={page === pagesCount}
                        iconName={Icons.FastArrowRight}
                        size="large"
                        onClick={handleSetLastPage}
                    />
                )}
            </div>
        </S.StyledTablePagination>
    );
};

TablePagination.displayName = 'TablePagination';
