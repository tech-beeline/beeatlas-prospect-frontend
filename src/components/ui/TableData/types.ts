import type { TdHTMLAttributes } from 'react';

import type { TableHorizontalAlign, TableVerticalAlign } from '../Table/types';

export interface TableDataProps extends TdHTMLAttributes<HTMLTableCellElement> {
    dense?: boolean;
    alignRight?: boolean;
    horizontalAlign?: TableHorizontalAlign;
    verticalAlign?: TableVerticalAlign;
    hoverText?: string;
    expandable?: boolean;
    depth?: number;
}
