import React, { forwardRef } from 'react';

import type { TableDataProps } from './types';
import * as S from './units';
import {
    buildCellFlexClassName,
    buildDepthStyle,
    buildTableDataClassName,
    warnAboutDeprecatedAlignRight,
} from './utils';

export const TableData = forwardRef<HTMLTableCellElement, TableDataProps>(
    (
        {
            dense = false,
            alignRight = false,
            horizontalAlign,
            verticalAlign,
            className,
            hoverText,
            expandable,
            children,
            depth,
            style,
            title,
            ...props
        },
        ref,
    ) => {
        warnAboutDeprecatedAlignRight(alignRight);

        const resolvedClassName = buildTableDataClassName({
            dense,
            alignRight,
            horizontalAlign,
            verticalAlign,
            expandable,
            depth,
            className,
        });

        const depthStyle = buildDepthStyle(depth);
        const resolvedStyle = depthStyle ? { ...depthStyle, ...style } : style;
        const cellFlexClassName = buildCellFlexClassName(alignRight);

        return (
            <S.StyledTableData
                ref={ref}
                data-testid="TableData"
                className={resolvedClassName}
                style={resolvedStyle}
                {...props}
                title={hoverText ?? title}
            >
                <S.CellFlex className={cellFlexClassName}>
                    <S.CellContent className="dsb_table-cell__content">{children}</S.CellContent>
                </S.CellFlex>
            </S.StyledTableData>
        );
    },
);

TableData.displayName = 'TableData';
