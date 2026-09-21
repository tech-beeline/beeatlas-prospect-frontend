import styled from '@emotion/styled';

export const StepLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 0;
`;

export const ResultScroll = styled.div`
    flex: 1;
    min-height: 0;
    overflow: auto;
`;

export const Footer = styled.footer`
    flex-shrink: 0;
    width: 100%;
    border-top: 1px solid var(--color-divider);
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
