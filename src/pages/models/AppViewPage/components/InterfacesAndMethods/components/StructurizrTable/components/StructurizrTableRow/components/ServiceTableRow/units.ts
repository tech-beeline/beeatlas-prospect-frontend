import styled from '@emotion/styled';

import { Table, TableData, TableRow } from 'components/ui';

export const TableRowStyled = styled(TableRow)`
    transition: background-color 0.25s ease-in-out;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;

export const DataContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    width: 100%;

    padding-left: 24px;
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const ServiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;

    padding: 24px 24px 24px 44px;

    border-left: 4px solid var(--color-background-brand);
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const MethodNameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    width: 100%;
`;

export const TableDataStyled = styled(TableData)`
    padding: 0;

    & > div > div {
        width: 100%;
    }
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;

export const TableDataError = styled(TableData)<{ isError: boolean }>`
    ${({ isError }) => (isError ? 'background-color: var(--color-control-background-error);' : '')}
`;
