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
    justify-content: space-between;

    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const FormContainer = styled.div`
    width: 100%;
    max-width: 910px;
`;

export const Content = styled.div`
    flex: 1;
    overflow-y: auto;

    display: flex;
    justify-content: center;
`;

export const Footer = styled.div`
    flex-shrink: 0;

    width: 100%;

    border-top: 1px solid var(--color-divider);
    background: var(--color-background-base);
`;

export const FooterInner = styled.div`
    max-width: 910px;
    margin: 0 auto;

    display: flex;
    justify-content: flex-end;
    gap: var(--size-spacing-x4);

    padding: var(--size-spacing-x4) 0;
`;

export const FlexSideContainer = styled.div`
    display: flex;
    align-items: center;
    gap: var(--size-spacing-x4);
`;
