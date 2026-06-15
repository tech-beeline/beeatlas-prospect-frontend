import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';
import { Table } from 'components/ui';

export const PageWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 32px 32px;
    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SearchFlexContainer = styled.div`
    display: flex;
    gap: 24px;
`;

export const SearchContainer = styled.div`
    display: flex;
    gap: 24px;

    max-width: 772px;
`;

export const TableStyled = styled(Table)`
    table-layout: fixed;

    overflow: hidden;
`;

export const TableHeaderDataStyled = styled(TableHeaderData)`
    white-space: nowrap;
`;

export const NotFoundContainer = styled.div`
    margin-top: 150px;
`;
