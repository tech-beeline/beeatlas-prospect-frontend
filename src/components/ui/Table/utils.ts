import type { TableProps, TableScrollConfig, TableScrollStyles } from './types';

export const buildTableClassName = ({
    dense,
    hover,
    alignRight,
    horizontalAlign,
    verticalAlign,
    numeric,
    monospaceNumeric,
    expandable,
    className,
}: Pick<
    TableProps,
    | 'dense'
    | 'hover'
    | 'alignRight'
    | 'horizontalAlign'
    | 'verticalAlign'
    | 'numeric'
    | 'monospaceNumeric'
    | 'expandable'
    | 'className'
>): string =>
    [
        'dsb_table',
        dense && 'dsb_table__dense',
        hover && 'dsb_table__hoverable',
        alignRight && 'dsb_table__align-right',
        horizontalAlign && `dsb_table__horizontal-align-${horizontalAlign}`,
        verticalAlign && `dsb_table__vertical-align-${verticalAlign}`,
        expandable && 'dsb_table__expandable',
        numeric && 'dsb_table__align-right',
        monospaceNumeric && 'dsb_table__monospace-numeric',
        className,
    ]
        .filter(Boolean)
        .join(' ');

export const buildTableScrollStyles = (scroll?: TableScrollConfig): TableScrollStyles => {
    const wrapperStyle: TableScrollStyles['wrapperStyle'] = {};
    const tableStyle: TableScrollStyles['tableStyle'] = {};

    if (scroll?.x !== undefined) {
        wrapperStyle.overflowX = 'auto';
        const x = scroll.x;

        if (typeof x === 'number') {
            wrapperStyle.width = x;
        } else if (x === true) {
            wrapperStyle.width = '100%';
        } else if (typeof x === 'string') {
            if (x === 'max-content') {
                tableStyle.width = 'max-content';
                wrapperStyle.width = '100%';
            } else {
                wrapperStyle.width = x;
            }
        }

        if (!tableStyle.width && (typeof scroll.x === 'number' || scroll.x === true)) {
            tableStyle.width = 'max-content';
        }
    }

    if (scroll?.y !== undefined) {
        wrapperStyle.overflowY = 'auto';
        const y = scroll.y;

        if (typeof y === 'number') {
            wrapperStyle.maxHeight = y;
        } else if (typeof y === 'string') {
            wrapperStyle.maxHeight = y;
        }
    }

    return { wrapperStyle, tableStyle };
};
