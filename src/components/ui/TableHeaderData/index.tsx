import React, { forwardRef } from 'react';

import type { TableHeaderDataProps } from './types';
import * as S from './units';
import { buildTableHeaderDataClassName, warnAboutDeprecatedAlignRight } from './utils';

export const TableHeaderData = forwardRef<HTMLTableCellElement, TableHeaderDataProps>(
    (
        {
            dense = false,

            alignRight = false,

            horizontalAlign,

            verticalAlign,

            className,

            children,

            expandable,

            ...props
        },

        ref,
    ) => {
        warnAboutDeprecatedAlignRight(alignRight);

        const resolvedClassName = buildTableHeaderDataClassName({
            dense,

            alignRight,

            horizontalAlign,

            verticalAlign,

            expandable,

            className,
        });

        return (
            <S.StyledTableHeaderData
                ref={ref}
                scope={horizontalAlign ? 'row' : 'col'}
                data-testid="TableHeaderData"
                className={resolvedClassName}
                {...props}
            >
                <S.HeaderFlex className="dsb_table-header-cell_flex">{children}</S.HeaderFlex>
            </S.StyledTableHeaderData>
        );
    },
);

TableHeaderData.displayName = 'TableHeaderData';
