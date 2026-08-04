import styled from '@emotion/styled';

import { Icon, Search, Table, TableData, TableHeaderData } from 'components/ui';
export const PageWrapper = styled.div`
    width: 100%;
    padding: 0px 54px 54px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 36px;
    margin-bottom: 16px;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 48px;

    margin: 24px 0px;
`;

export const SearchStyled = styled(Search)`
    max-width: 520px;

    margin-top: 24px;
    margin-bottom: 24px;
`;

export const Title = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);
`;

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;

    margin: 24px 0px;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const TableHeaderDataNoWrap = styled(TableHeaderData)`
    white-space: nowrap;
`;

export const TableHeaderName = styled(TableHeaderDataNoWrap)`
    min-width: 214px;
`;

export const TableHeaderStatus = styled(TableHeaderDataNoWrap)`
    min-width: 100px;
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderDataNoWrap)`
    width: 100%;
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
    position: relative;

    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: center;
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
