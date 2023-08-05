import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    height: 100vh;
    padding: 124px 52px 0;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const Title = styled.h3`
    font-weight: 400;
    font-size: var(--font-size-h3);
    line-height: 44px;
    letter-spacing: 0.3px;
`;

export const Description = styled.p`
    margin-top: 12px;

    font-weight: 400;
    font-size: var(--font-size-body1);
    line-height: 24px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textInactive};
`;
