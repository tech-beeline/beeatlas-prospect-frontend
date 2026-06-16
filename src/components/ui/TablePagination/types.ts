import type { HTMLAttributes, ReactNode } from 'react';

export type TablePaginationUserActions = {
    page: number;
    rowsPerPage: number;
};

export interface TablePaginationProps extends HTMLAttributes<HTMLDivElement> {
    label?: ReactNode;
    rowsCount: number;
    page?: number;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rowsPerPage: number) => void;
    onUserActions?: (actions: TablePaginationUserActions) => void;
    showFirstAndLastButtons?: boolean;
    className?: string;
}
