import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    height: 100vh;
    padding: 124px 52px 0;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const Title = styled.h3`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-h3);
    line-height: var(--font-line-height-h3);

    letter-spacing: var(--font-letter-spacing-h1);
`;

export const Description = styled.p`
    margin-top: 12px;

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    letter-spacing: var(--font-letter-spacing-body3);

    color: ${theme.colors.textInactive};
`;
