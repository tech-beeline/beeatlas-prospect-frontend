import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100vh;
    overflow: hidden;

    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    width: 100%;
    height: 64px;
    padding: 0 24px;

    border-bottom: 1px solid var(--color-divider);

    flex-shrink: 0;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    flex: 1;
    min-height: 0;
    width: 100%;
`;

export const Content = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;

    padding: 0px 32px;

    flex: 1;
    min-height: 0;
    width: 100%;
    overflow-y: auto;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
    max-width: 910px;
    padding-top: 32px;
    padding-bottom: 32px;
`;

export const GroupsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const AddGroupButtonContainer = styled.div``;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 88px;
    padding: 0 24px;

    border-top: 1px solid var(--color-divider);

    flex-shrink: 0;
`;

export const FooterContent = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    width: 100%;
    max-width: 910px;
`;
