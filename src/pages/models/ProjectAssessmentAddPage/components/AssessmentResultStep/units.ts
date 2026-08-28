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

export const PublicationLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export const PublicationContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 24px;
    min-height: 0;
    padding: 24px 16px;
    overflow: auto;
`;

export const PublicationHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
`;

export const PublicationFooter = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px 16px 24px;
    border-top: 1px solid var(--color-divider);
`;
