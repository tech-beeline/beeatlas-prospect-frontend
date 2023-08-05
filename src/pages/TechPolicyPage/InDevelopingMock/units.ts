import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    height: 496px;

    background-color: var(--color-background-base);
`;

export const Image = styled.img`
    min-width: 200px;
    min-height: 200px;
    max-width: 200px;
    max-height: 200px;
`;

export const Text = styled.p`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    color: ${theme.colors.textActive};
`;

export const Description = styled.p`
    margin-top: -8px;

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    letter-spacing: var(--font-letter-spacing-body3);

    color: ${theme.colors.textInactive};
`;
