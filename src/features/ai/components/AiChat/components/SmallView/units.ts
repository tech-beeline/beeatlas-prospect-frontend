import styled from '@emotion/styled';

export const Container = styled.div`
    position: fixed;
    right: 32px;
    bottom: 32px;

    display: flex;
    flex-direction: column;

    width: 480px;
    max-height: 886px;
    height: calc(100vh - 64px);

    background: var(--color-background-base);
    border: 1px solid var(--color-divider);
    border-radius: 12px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    z-index: 1000;

    overflow: hidden;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 16px;

    border-bottom: 1px solid var(--color-divider);
`;

export const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Body = styled.div<{ $isEmpty?: boolean }>`
    display: flex;
    flex: 1;
    flex-direction: column-reverse;
    min-height: 0;

    padding: ${({ $isEmpty }) => ($isEmpty ? '32px 24px' : '16px 24px')};
    align-items: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'stretch')};
    justify-content: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'flex-start')};
    text-align: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'initial')};

    overflow-y: auto;
`;

export const WelcomeBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export const DateSeparator = styled.div`
    display: flex;
    justify-content: center;

    margin-bottom: 16px;
`;

export const MessagesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
`;

export const Footer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 8px;

    padding: 16px;

    border-top: 1px solid var(--color-divider);
`;
