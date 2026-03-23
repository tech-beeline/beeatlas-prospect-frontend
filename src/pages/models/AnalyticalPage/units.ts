import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    height: calc(100vh - 64px);
    padding: 32px;
    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 32px;

    border-radius: 12px;
    border: 1px solid var(--color-divider);
`;
