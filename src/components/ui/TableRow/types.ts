import type { TableHTMLAttributes } from 'react';

import type { TableHorizontalAlign, TableVerticalAlign } from '../Table/types';

export interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
    selected?: boolean;
    hover?: boolean;
    dense?: boolean;
    alignRight?: boolean;
    horizontalAlign?: TableHorizontalAlign;
    verticalAlign?: TableVerticalAlign;
    depth?: number;
    hidden?: boolean;
    isExpanded?: boolean;
    expandable?: boolean;
    base?: boolean;
}
