import { Search, TableHeaderData } from '@beeline/design-system-react';
import styled from '@emotion/styled';

import { Hint } from 'pages/TechRadarPage/components/LeftMenu/Hint';
import { theme } from 'styles';

export const PageWrapper = styled.div`
    /* display: flex;
    justify-content: space-between; */

    height: 100vh;
    width: 100%;
    padding: 64px 54px;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
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
