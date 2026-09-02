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
    justify-content: space-between;
    gap: 8px;
    padding: 12px 24px;
    border-bottom: 1px solid var(--color-divider);
`;

export const Subheader = styled.div`
    display: flex;
    flex: 0 0 56px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--color-divider);
    width: 100%;
`;
