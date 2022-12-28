import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    height: max-content;
    padding: 124px 52px 0;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const Title = styled.h1`
    font-weight: 400;
    font-size: 34px;
    line-height: 44px;
    letter-spacing: 0.3px;
`;

export const Description = styled.p`
    margin-top: 12px;

    font-weight: 400;
    font-size: 19px;
    line-height: 24px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textInactive};
`;
