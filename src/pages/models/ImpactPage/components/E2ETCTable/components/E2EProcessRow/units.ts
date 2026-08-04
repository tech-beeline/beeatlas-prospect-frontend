import styled from '@emotion/styled';

import { TableData, TableRow } from 'components/ui';

export const TableRowStyled = styled(TableRow)<{ expanded?: boolean }>`
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const TableContainer = styled.div`
    width: 100%;

    padding-left: 24px;

    border-left: 4px solid var(--color-background-brand);
`;

export const TableStyled = styled.table`
    width: 100%;

    border-collapse: collapse;
`;

export const TableDataColomn = styled(TableData)`
    > div > div {
        display: flex;
        flex-direction: column;
    }
`;
