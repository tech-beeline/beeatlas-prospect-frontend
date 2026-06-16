import { css } from '@emotion/react';
import styled from '@emotion/styled';

const tableBaseStyles = css`
    background-color: var(--color-background-base);
    border: 1px solid var(--color-border);
    border-color: var(--color-border);
    border-radius: var(--size-border-radius-x6, 4px);
    border-spacing: unset;
    border-collapse: collapse;
    border-style: hidden;
    box-shadow: 0 0 0 1px var(--color-divider);
    margin: 1px;
    box-sizing: border-box;
`;

const tableModifierStyles = css`
    &.dsb_table__hoverable .dsb_table-body .dsb_table-row {
        cursor: pointer;
    }

    &.dsb_table__hoverable .dsb_table-body .dsb_table-row:hover {
        background: var(--color-background-base-hover);
    }

    &.dsb_table__hoverable .dsb_table-body .dsb_table-row:focus,
    &.dsb_table__hoverable .dsb_table-body .dsb_table-row:active {
        background: var(--color-background-base-focused);
    }

    &.dsb_table__dense .dsb_table-cell,
    &.dsb_table__dense .dsb_table-header-cell {
        padding: 6px 16px;
    }

    &.dsb_table__vertical-align-top .dsb_table-cell,
    &.dsb_table__vertical-align-top .dsb_table-header-cell {
        vertical-align: top;
    }

    &.dsb_table__vertical-align-center .dsb_table-cell,
    &.dsb_table__vertical-align-center .dsb_table-header-cell {
        vertical-align: middle;
    }

    &.dsb_table__vertical-align-bottom .dsb_table-cell,
    &.dsb_table__vertical-align-bottom .dsb_table-header-cell {
        vertical-align: bottom;
    }

    &.dsb_table__horizontal-align-left .dsb_table-cell_flex,
    &.dsb_table__horizontal-align-left .dsb_table-header-cell_flex {
        justify-content: flex-start;
    }

    &.dsb_table__horizontal-align-center .dsb_table-cell_flex,
    &.dsb_table__horizontal-align-center .dsb_table-header-cell_flex {
        justify-content: center;
    }

    &.dsb_table__horizontal-align-right .dsb_table-cell_flex,
    &.dsb_table__horizontal-align-right .dsb_table-header-cell_flex {
        justify-content: flex-end;
    }

    &.dsb_table__align-right .dsb_table-cell_flex,
    &.dsb_table__align-right .dsb_table-header-cell_flex {
        justify-content: end;
    }

    &.dsb_table__monospace-numeric .dsb_table-cell_flex,
    &.dsb_table__monospace-numeric .dsb_table-header-cell_flex {
        font-variant-numeric: tabular-nums;
    }

    &.dsb_table__expandable {
        border-radius: 12px;
    }
`;

export const StyledTable = styled.table`
    ${tableBaseStyles}
    ${tableModifierStyles}
`;

export const ScrollWrapper = styled.div`
    box-sizing: border-box;
`;
