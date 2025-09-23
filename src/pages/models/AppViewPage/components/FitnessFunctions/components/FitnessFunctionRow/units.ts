import { TableData, TableRow } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const TableRowStyled = styled(TableRow)<{ expanded?: boolean }>`
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};
`;

export const CodeContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const TableDataStyled = styled(TableData)`
    position: relative;

    padding-left: 40px;

    white-space: pre-wrap;
`;

export const Divider = styled.div`
    position: absolute;
    left: 0;
    top: 0;

    width: 4px;
    height: 100%;

    background-color: var(--color-background-brand);
`;

export const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
