import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    height: 100vh;
    width: 100%;
    padding: 64px 54px;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const TitleFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
