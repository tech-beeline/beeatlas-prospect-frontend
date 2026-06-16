import type { CSSProperties, TableHTMLAttributes } from 'react';

export type TableHorizontalAlign = 'left' | 'center' | 'right';
export type TableVerticalAlign = 'top' | 'center' | 'bottom';

export type TableScrollConfig = {
    x?: boolean | number | string;
    y?: boolean | number | string;
};

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    dense?: boolean;
    hover?: boolean;
    alignRight?: boolean;
    horizontalAlign?: TableHorizontalAlign;
    verticalAlign?: TableVerticalAlign;
    numeric?: boolean;
    monospaceNumeric?: boolean;
    expandable?: boolean;
    scroll?: TableScrollConfig;
    dataTestId?: string;
}

export interface TableScrollStyles {
    wrapperStyle: CSSProperties;
    tableStyle: CSSProperties;
}
