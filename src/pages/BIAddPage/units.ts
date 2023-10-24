import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    height: 100vh;

    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const FlexSideContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Title = styled.p`
    height: var(--font-line-height-subtitle1);

    font-weight: var(--font-weight-subtitle1);
    font-size: var(--font-size-subtitle1);
    line-height: var(--font-line-height-subtitle1);
`;

export const Content = styled.div`
    max-height: calc(100vh - 64px);

    padding: 0px 150px 50px;

    overflow-y: scroll;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
    }
`;

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin-top: 24px;
`;
