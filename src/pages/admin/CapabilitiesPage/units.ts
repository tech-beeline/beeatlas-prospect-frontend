import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    width: 100%;
    padding: 0px 54px 54px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 32px;
    margin-bottom: 24px;
`;

export const Title = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);
`;
