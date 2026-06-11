import React, { forwardRef } from 'react';

import type { TableProps } from './types';
import * as S from './units';
import { buildTableClassName, buildTableScrollStyles } from './utils';

export const Table = forwardRef<HTMLTableElement, TableProps>(
    (
        {
            dense = false,
            hover = false,
            alignRight = false,
            horizontalAlign,
            verticalAlign,
            numeric = false,
            monospaceNumeric = false,
            expandable,
            className,
            children,
            scroll,
            dataTestId = 'Table',
            style,
            ...props
        },
        ref,
    ) => {
        const resolvedClassName = buildTableClassName({
            dense,
            hover,
            alignRight,
            horizontalAlign,
            verticalAlign,
            numeric,
            monospaceNumeric,
            expandable,
            className,
        });
        const { wrapperStyle, tableStyle } = buildTableScrollStyles(scroll);

        const tableElement = (
            <S.StyledTable
                ref={ref}
                data-testid={dataTestId}
                className={resolvedClassName}
                style={{ ...style, ...tableStyle }}
                {...props}
            >
                {children}
            </S.StyledTable>
        );

        if (scroll) {
            return (
                <S.ScrollWrapper className="dsb_table__scroll-wrapper" style={wrapperStyle}>
                    {tableElement}
                </S.ScrollWrapper>
            );
        }

        return tableElement;
    },
);

Table.displayName = 'Table';
