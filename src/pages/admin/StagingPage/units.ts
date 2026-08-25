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

export const FiltersContainer = styled.div`
    display: grid;
    grid-template-columns:
        minmax(100px, 260px) minmax(100px, 260px) minmax(100px, 260px) minmax(100px, 260px)
        115px;
    align-items: end;
    gap: 24px;
`;

export const SearchContainer = styled.div`
    grid-column: span 2;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const TableHeaderDataNoWrap = styled(TableHeaderData)`
    white-space: nowrap;
`;
