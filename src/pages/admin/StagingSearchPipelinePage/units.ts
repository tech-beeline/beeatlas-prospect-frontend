import styled from '@emotion/styled';

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
    grid-template-columns: minmax(280px, 648px) 115px;
    align-items: end;
    gap: 24px;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const TableHeaderDataStyled = styled(TableHeaderData)`
    white-space: nowrap;

    &:nth-of-type(1) {
        width: 12%;
    }

    &:nth-of-type(2) {
        width: 20%;
    }

    &:nth-of-type(3) {
        width: 38%;
    }
`;
