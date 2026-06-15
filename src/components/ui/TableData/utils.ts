import type { TableDataProps } from './types';

export const warnAboutDeprecatedAlignRight = (alignRight: boolean | undefined): void => {
    if (alignRight && process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('Свойство alignRight устарело, используйте horizontalAlign="right"');
    }
};

export const buildTableDataClassName = ({
    dense,
    alignRight,
    horizontalAlign,
    verticalAlign,
    expandable,
    depth,
    className,
}: Pick<
    TableDataProps,
    | 'dense'
    | 'alignRight'
    | 'horizontalAlign'
    | 'verticalAlign'
    | 'expandable'
    | 'depth'
    | 'className'
>): string =>
    [
        'dsb_table-cell',
        dense && 'dsb_table-cell__dense',
        alignRight && !horizontalAlign && 'dsb_table-cell__horizontal-align-right',
        horizontalAlign && `dsb_table-cell__horizontal-align-${horizontalAlign}`,
        verticalAlign && `dsb_table-cell__vertical-align-${verticalAlign}`,
        expandable && 'dsb_table-cell__expandable',
        Boolean(depth) && `dsb_table-cell__depth-${depth}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

export const buildCellFlexClassName = (alignRight: boolean | undefined): string =>
    ['dsb_table-cell_flex', alignRight && 'dsb_table-cell__align-right'].filter(Boolean).join(' ');

export const buildDepthStyle = (depth: number | undefined): { paddingLeft?: string } | undefined =>
    depth ? { paddingLeft: `calc(16px * ${depth})` } : undefined;
