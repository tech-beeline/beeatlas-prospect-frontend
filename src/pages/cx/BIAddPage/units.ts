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
    position: relative;

    display: flex;

    width: 100%;
    max-height: calc(100vh - 64px);

    padding: 0px 150px;

    overflow-y: scroll;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: calc(100vh - 64px - 50px);
    width: 100%;

    padding-bottom: 100px;
`;

export const FormContainer = styled.div`
    flex: 1;

    height: 100%;

    padding-bottom: 50px;
`;

export const Navigation = styled.div`
    position: sticky;
    top: 24px;

    height: 100%;

    flex-shrink: 1;

    margin-left: 40px;
`;

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin-top: 24px;
`;

export const UneditableContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
`;
