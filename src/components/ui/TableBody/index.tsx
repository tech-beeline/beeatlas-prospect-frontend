import React, { forwardRef } from 'react';

import type { TableBodyProps } from './types';
import * as S from './units';

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ className, children, ...props }, ref) => {
        const resolvedClassName = ['dsb_table-body', className].filter(Boolean).join(' ');

        return (
            <S.StyledTableBody
                ref={ref}
                data-testid="TableBody"
                className={resolvedClassName}
                {...props}
            >
                {children}
            </S.StyledTableBody>
        );
    },
);

TableBody.displayName = 'TableBody';
