import styled from '@emotion/styled';

import { Table, TableHeaderData } from 'components/ui';

export const PageWrapper = styled.main`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    min-width: 760px;
    min-height: 100%;
    padding: 32px;
    box-sizing: border-box;
    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const TableStyled = styled(Table)`
    width: 100%;
    table-layout: fixed;
`;

export const ActionHeader = styled(TableHeaderData)`
    width: 56px;
`;

export const EmptyState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
`;

export const NotFoundPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 32px;
    background-color: var(--color-background-base);
`;
