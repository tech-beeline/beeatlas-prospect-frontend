import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    padding: 60px 52px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
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

    color: var(--color-text-inactive);
`;
