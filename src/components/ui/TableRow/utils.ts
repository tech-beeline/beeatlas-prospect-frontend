import type { TableRowProps } from './types';

export const buildTableRowClassName = ({
    selected,
    hover,
    dense,
    alignRight,
    horizontalAlign,
    verticalAlign,
    depth,
    isExpanded,
    expandable,
    base,
    className,
}: Pick<
    TableRowProps,
    | 'selected'
    | 'hover'
    | 'dense'
    | 'alignRight'
    | 'horizontalAlign'
    | 'verticalAlign'
    | 'depth'
    | 'isExpanded'
    | 'expandable'
    | 'base'
    | 'className'
>): string =>
    [
        'dsb_table-row',
        selected && 'dsb_table-row__selected',
        hover && 'dsb_table-row__hoverable',
        dense && 'dsb_table-row__dense',
        alignRight && 'dsb_table__align-right',
        horizontalAlign && `dsb_table-row__horizontal-align-${horizontalAlign}`,
        verticalAlign && `dsb_table-row__vertical-align-${verticalAlign}`,
        isExpanded && 'dsb_table-row__expanded',
        expandable && 'dsb_table-row__expandable',
        Boolean(depth) && `dsb_table-row__depth-${depth}`,
        base && 'dsb_table-row__base',
        className,
    ]
        .filter(Boolean)
        .join(' ');
