import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';
import { Table, TableData, TableRow } from 'components/ui';

export const TableWrapper = styled.div`
    max-width: 100%;
    height: fit-content;

    border-radius: 12px;
    border: 1px solid var(--color-divider);
    overflow: auto;
`;

export const TableStyled = styled(Table)`
    margin: 0px;

    border-collapse: separate;

    box-shadow: none;
`;

export const TableRowStyled = styled(TableRow)`
    border-bottom: 0px solid var(--color-divider);
`;

export const TableHeaderDataStyled = styled(TableHeaderData)<{ showShadow?: boolean }>`
    background-color: var(--color-background-base);

    border-radius: 0px;

    position: sticky;
    top: 0;
    left: 0;

    z-index: 21;

    box-shadow: ${({ showShadow }) => (showShadow ? '6px 0 10px -6px rgba(0, 0, 0, 0.1)' : 'none')};
`;

export const TableHeaderDataSticky = styled(TableHeaderData)`
    background-color: var(--color-background-base);

    border-radius: 0px;

    position: sticky;
    top: 0;

    max-width: 140px;
    min-width: 140px;

    z-index: 11;

    & > div {
        display: block;

        width: 100%;

        text-align: center;
    }
`;

export const CodeContainer = styled.div<{ showButton: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;

    text-align: start;

    overflow: hidden;
    white-space: normal;
    overflow-wrap: anywhere;

    cursor: pointer;

    & > button {
        display: ${({ showButton }) => (showButton ? 'block' : 'none')};
    }

    &:hover > button {
        display: block;
    }
`;

export const TableDataFullWidth = styled(TableData)<{ isExpanded?: boolean }>`
    border-bottom: 1px solid var(--color-divider);

    ${({ isExpanded }) =>
        isExpanded ? 'background-color: var(--color-background-base-selected);' : ''}

    & > div > div {
        width: 100%;
    }
`;

export const TableDataContent = styled.div`
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;

    width: 100%;
`;

export const TableDataName = styled(TableData)<{
    showShadow?: boolean;
    isExpanded?: boolean;
    themeIsDark?: boolean;
}>`
    position: sticky;

    left: 0;

    background-color: var(--color-background-base);

    z-index: 1;

    border-bottom: 1px solid var(--color-divider);
    box-shadow: ${({ showShadow }) => (showShadow ? '0px 2px 10px rgba(0, 0, 0, 0.1)' : 'none')};

    ${({ isExpanded, themeIsDark }) =>
        isExpanded ? `background-color: ${themeIsDark ? '#262626' : '#f3f3f5'};` : ''}
`;

export const TableDataNameStyled = styled(TableDataName)`
    padding: 0px;
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    width: 218px;
`;

export const ProductNameContainer = styled.div`
    padding: 16px;

    width: 250px;

    border-left: 4px solid var(--color-background-brand);
`;
