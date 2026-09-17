import styled from '@emotion/styled';

export const Footer = styled.footer`
    flex-shrink: 0;
    width: 100%;
    border-top: 1px solid var(--color-divider);
    background-color: var(--color-background-base);
`;

export const FooterContent = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    box-sizing: border-box;
    width: var(--assessment-content-width);
    margin: 0 auto;
    padding: 16px 0 24px;
`;

export const NextAction = styled.span`
    display: inline-flex;
`;
