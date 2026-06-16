import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
    height: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    overflow: auto;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 40px;
`;

export const BreadCrumbsContainer = styled.div`
    margin-bottom: -16px;
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    max-width: 100%;

    flex: 1;
`;

export const AppTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: -16px;
`;

export const AppTitleIconWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    min-width: 0;
`;

export const NotFoundContainer = styled.div`
    margin-top: 200px;
`;
