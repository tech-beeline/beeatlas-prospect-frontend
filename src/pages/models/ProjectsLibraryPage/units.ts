import styled from '@emotion/styled';

import { Text } from 'components/core';
import { Table, TableHeaderData } from 'components/ui';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const PageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SearchContainer = styled.div`
    grid-column: span 2;
`;

export const FiltersContainer = styled.div`
    display: grid;
    grid-template-columns: 260px 260px 160px 116px;
    align-items: center;
    gap: 24px;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const TableHeaderDataNoWrap = styled(TableHeaderData)`
    white-space: nowrap;
`;

export const EmptyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 400px;
`;

export const OptionContent = styled.div`
    min-width: 0;
`;

export const OptionText = styled(Text)`
    display: block;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
`;
