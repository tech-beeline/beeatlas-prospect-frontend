import styled from '@emotion/styled';

export const Layout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 24px;
    min-height: 0;
    padding: 24px 16px;
    overflow: auto;
`;

export const Header = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
`;

export const Footer = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px 16px 24px;
    border-top: 1px solid var(--color-divider);
`;
