import React, { forwardRef } from 'react';

import type { TableRowProps } from './types';
import * as S from './units';
import { buildTableRowClassName } from './utils';

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
    (
        {
            selected = false,
            hover = false,
            dense = false,
            alignRight = false,
            horizontalAlign,
            verticalAlign,
            depth,
            hidden = false,
            isExpanded,
            expandable,
            base,
            className,
            children,
            ...props
        },
        ref,
    ) => {
        if (hidden) {
            return null;
        }

        const resolvedClassName = buildTableRowClassName({
            selected,
            hover,
            dense,
            alignRight,
            horizontalAlign,
            verticalAlign,
            depth,
            isExpanded,
            expandable,
            base,
            className,
        });

        return (
            <S.StyledTableRow
                ref={ref}
                data-testid="TableRow"
                className={resolvedClassName}
                {...props}
            >
                {children}
            </S.StyledTableRow>
        );
    },
);

TableRow.displayName = 'TableRow';
