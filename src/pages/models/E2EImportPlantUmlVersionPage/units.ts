import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: var(--app-height);
    min-height: 0;
    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.header`
    display: flex;
    flex: 0 0 64px;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-bottom: 1px solid var(--color-divider);
`;

export const StateContainer = styled.div`
    width: min(100%, 1000px);
    margin: 0 auto;
    padding: 32px 24px;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;
