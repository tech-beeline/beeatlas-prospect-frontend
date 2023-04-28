import { Search } from '@beeline/design-system-react';
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

export const Title = styled.h3`
    display: flex;
    align-items: center;
    gap: 8px;

    font-weight: 500;
    font-size: 26px;
    line-height: 32px;

    width: 798px;
    margin: 40px 0 12px;
`;

export const SearchStyled = styled(Search)`
    margin: 20px 0 16px 0;
`;

export const HintStyled = styled(Hint)`
    margin-top: 6px;
`;
