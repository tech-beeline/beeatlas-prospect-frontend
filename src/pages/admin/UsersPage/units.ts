import styled from '@emotion/styled';

import { Search } from 'components/ui';
import { Table, TableHeaderData } from 'components/ui';

import { Hint } from 'pages/models/TechRadarPage/components/LeftMenu/components';

export const PageWrapper = styled.div`
    width: 100%;
    padding: 0px 54px 54px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Title = styled.h4`
    display: flex;
    align-items: center;
    gap: 8px;

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);

    width: 798px;
    margin: 40px 0 12px;
`;

export const SearchStyled = styled(Search)`
    margin: 20px 0 16px 0;
`;

export const HintStyled = styled(Hint)`
    margin-top: 6px;
`;

export const TableHeaderFlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const TableHeaderDataStyled = styled(TableHeaderData)`
    user-select: none;
    cursor: pointer;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const RolesContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;
