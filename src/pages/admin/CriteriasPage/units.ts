import styled from '@emotion/styled';

import { Icon, Table, TableData, TableHeaderData } from 'components/ui';
export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const FiltersContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
`;

export const SearchContainer = styled.div`
    flex: 1;

    max-width: 648px;
`;

export const TableStyled = styled(Table)`
    width: 100%;

    table-layout: fixed !important;
`;

export const TableHeaderDataStyled = styled(TableHeaderData)`
    width: 100%;
`;

export const TableHeaderDataButtons = styled(TableHeaderData)`
    width: 52px;
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const BoldSpan = styled.span`
    font-weight: var(--font-weight-subtitle3);
`;

export const DescriptionContainer = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;

    max-width: fit-content;
`;

export const IconStyled = styled(Icon)`
    cursor: pointer;

    color: var(--color-text-inactive);

    &:hover {
        color: var(--color-text-active);
    }
`;

export const NotFoundContainer = styled.div`
    margin-top: 160px;
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;
