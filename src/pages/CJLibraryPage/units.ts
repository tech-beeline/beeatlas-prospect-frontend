import styled from '@emotion/styled';

import { Subtitle1 } from 'styles/units';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    height: calc(100vh - 64px);

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    overflow-y: scroll;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
`;

export const MarginBlock = styled.div`
    height: 64px;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    padding: 32px 52px 0 108px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;

    margin-top: 24px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const CJCard = styled.div`
    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const FlexContainer = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
`;

export const Title = styled(Subtitle1)`
    margin-top: 16px;

    color: var(--color-text-link);

    cursor: pointer;
`;

export const Number = styled.div`
    margin-top: 4px;

    color: var(--color-text-disabled);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    letter-spacing: var(--font-letter-spacing-body3);
`;

export const Description = styled.div`
    margin-top: 16px;

    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;
