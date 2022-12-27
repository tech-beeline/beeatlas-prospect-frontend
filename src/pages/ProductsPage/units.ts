import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    height: max-content;
    padding: 124px 308px;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const Title = styled.h1`
    font-weight: 400;
    font-size: 34px;
    line-height: 44px;
    letter-spacing: 0.3px;
`;
