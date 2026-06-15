import React, { forwardRef } from 'react';

import type { TableHeadProps } from './types';
import * as S from './units';

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
    ({ className, children, shadow = false, ...props }, ref) => {
        const resolvedClassName = ['dsb_table-head', shadow && 'dsb_table-head__shadow', className]
            .filter(Boolean)
            .join(' ');

        return (
            <S.StyledTableHead
                ref={ref}
                data-testid="TableHead"
                className={resolvedClassName}
                {...props}
            >
                {children}
            </S.StyledTableHead>
        );
    },
);

TableHead.displayName = 'TableHead';
