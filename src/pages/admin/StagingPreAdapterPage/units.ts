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

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const FiltersContainer = styled.div`
    display: grid;
    grid-template-columns: minmax(100px, 260px) 115px;
    align-items: end;
    gap: 24px;
`;

export const SearchContainer = styled.div`
    grid-column: span 2;
`;

export const CardsContainer = styled.div`
    display: flex;
    gap: 24px;
`;

export const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    flex: 1;
    padding: 16px;

    border-radius: 12px;
    border: 1px solid var(--color-divider);
`;

export const SuccessText = styled(Text)`
    color: var(--color-status-success);
`;

export const InfoText = styled(Text)`
    color: var(--color-status-info);
`;

export const ErrorText = styled(Text)`
    color: var(--color-status-error);
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const TableHeaderDataNoWrap = styled(TableHeaderData)`
    white-space: nowrap;
`;
