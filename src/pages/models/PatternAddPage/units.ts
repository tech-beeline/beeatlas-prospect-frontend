import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;

    height: 100vh;

    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const Subheader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 56px;

    border-bottom: 1px solid var(--color-divider);
`;
