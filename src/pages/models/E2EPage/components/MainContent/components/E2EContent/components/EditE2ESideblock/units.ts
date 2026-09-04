import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;

    height: 100vh;
`;

export const Content = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;
`;

export const Title = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

export const Footer = styled.div`
    display: flex;
    gap: 16px;

    padding: 16px 24px 24px;

    border-top: 1px solid var(--color-divider);
`;
