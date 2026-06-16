import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    position: relative;

    width: 100%;

    padding: 32px 52px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div``;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Title = styled.h4`
    font-weight: var(--font-weight-h4);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);
`;

export const CardsContainer = styled.div`
    margin-top: 24px;

    overflow: hidden;

    border-radius: var(--size-border-radius-x6);
    border: 1px solid var(--color-divider);
`;

export const NotFoundContainer = styled.div`
    margin-top: 140px;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 32px;
`;

export const BoldSpan = styled.span`
    font-weight: var(--font-weight-subtitle3);
`;
