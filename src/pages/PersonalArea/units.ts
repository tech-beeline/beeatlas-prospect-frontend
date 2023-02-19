import { Search } from '@beeline/design-system-react';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    /* display: flex;
    justify-content: space-between; */

    height: 100vh;
    width: calc(100% - 50px);
    padding-top: 64px;

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
