import { Table, TableData, TableHeaderData, TableRow } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const TableRowStyled = styled(TableRow)<{ expanded?: boolean }>`
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};
`;

export const IconButtonContainer = styled.div`
    width: 20px;
    height: 20px;
`;

export const CodeContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const ServiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;

    padding: 24px 24px 24px 36px;

    border-left: 4px solid var(--color-background-brand);
`;

export const TableDataStyled = styled(TableData)`
    padding: 0;

    & > div > div {
        width: 100%;
    }
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const ValueContainer = styled.div`
    a {
        color: var(--color-text-link);
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const TableHeaderDataFixedWidth = styled(TableHeaderData)`
    max-width: 111px;
`;

export const TableDataFixedWidth = styled(TableData)`
    max-width: 111px;
`;
