import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    padding: 52px 52px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 50%;
`;

export const H3 = styled.h3`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-h3);
    line-height: var(--font-line-height-h3);

    width: 798px;
    margin: 0 0 32px;
`;

export const SmallText = styled.p`
    display: flex;

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    margin-bottom: 24px;
`;

export const AdaptiveCardContainer = styled.div`
    display: flex;
    gap: 24px;

    margin-bottom: 24px;

    @media only screen and (max-width: 1100px) {
        flex-direction: column;
    }
`;
