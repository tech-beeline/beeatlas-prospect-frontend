import type { ThHTMLAttributes } from 'react';

import type { TableHorizontalAlign, TableVerticalAlign } from '../Table/types';

export interface TableHeaderDataProps extends ThHTMLAttributes<HTMLTableCellElement> {
    dense?: boolean;

    alignRight?: boolean;

    horizontalAlign?: TableHorizontalAlign;

    verticalAlign?: TableVerticalAlign;

    expandable?: boolean;
}
