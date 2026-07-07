import type { KeyboardEvent } from 'react';

import { ISession, ISessionMessage } from 'api/ai-chat/types';

export interface ChatHistorySection {
    title: string;
    items: ISession[];
    pinned?: boolean;
}

export interface ChatMessageItem {
    message: ISessionMessage;
    isLoading?: boolean;
    error?: boolean;
    contextLabel?: string;
}

export interface ChatMessageGroup {
    dateKey: string;
    title: string;
    messages: ChatMessageItem[];
}

export interface AiChatViewProps {
    message: string;
    onMessageChange: (value: string) => void;
    onSend: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
    onClose: () => void;
    sessions: ChatHistorySection[];
    messageGroups: ChatMessageGroup[];
}

export interface SmallViewProps extends AiChatViewProps {
    onExpand: () => void;
}

export interface FullscreenViewProps extends AiChatViewProps {
    onCollapse: () => void;
}
