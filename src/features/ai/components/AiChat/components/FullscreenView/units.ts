import styled from '@emotion/styled';

export const Container = styled.div`
    position: fixed;
    inset: 0;

    display: flex;
    flex-direction: column;

    background: var(--color-background-base);

    z-index: 1000;

    overflow: hidden;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
`;

export const Sidebar = styled.aside`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    width: 256px;

    border-right: 1px solid var(--color-divider);
`;

export const SidebarHeader = styled.div`
    flex-shrink: 0;

    padding: 16px;

    border-bottom: 1px solid var(--color-divider);
`;

export const SidebarContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 24px;

    padding: 16px 20px;

    overflow-y: auto;
`;

export const HistorySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const NoSessions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const HistorySectionTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 12px 0 12px;
`;

export const Main = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
`;

export const MessagesArea = styled.div<{ $isEmpty?: boolean }>`
    display: flex;
    flex: 1;
    flex-direction: column-reverse;
    min-height: 0;

    padding: 24px 48px;
    align-items: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'stretch')};
    justify-content: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'flex-start')};

    overflow-y: auto;
`;

export const WelcomeBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    max-width: 640px;

    text-align: center;
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
    max-width: 720px;
    margin: 0 auto;
`;

export const InputArea = styled.div`
    flex-shrink: 0;

    padding: 16px 48px 32px;
`;

export const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    width: 100%;
    max-width: 720px;
    margin: 0 auto;
`;

export const InputRow = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 8px;

    width: 100%;
`;

export const Suggestions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
`;
