import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePageContextStore } from 'features/ai-context';
import { useAuthStore } from 'features/auth';

import {
    useGetAllUserSessionsQuery,
    useGetSessionHistoryQuery,
    usePostMessageMutation,
    usePostSessionMutation,
} from 'api/queries/ai-chat';

import { useAiChatStore } from '../../store';

import { FullscreenView, SmallView } from './components';
import { groupMessagesByDate, groupSessionsByDate } from './utils';

export const AiChat: FC = () => {
    const [hasProcessingSessions, setHasProcessingSessions] = useState(false);
    const [lastSentMessage, setLastSentMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const isOpen = useAiChatStore((state) => state.isOpen);
    const isFullscreen = useAiChatStore((state) => state.isFullscreen);
    const prefillText = useAiChatStore((state) => state.prefillText);
    const pinnedSessionKeys = useAiChatStore((state) => state.pinnedSessions);
    const setPrefillText = useAiChatStore((state) => state.setPrefillText);
    const setIsFullscreen = useAiChatStore((state) => state.setIsFullscreen);
    const close = useAiChatStore((state) => state.close);
    const shouldSendMessage = useAiChatStore((state) => state.shouldSendMessage);
    const setShouldSendMessage = useAiChatStore((state) => state.setShouldSendMessage);
    const selectedSessionKey = useAiChatStore((state) => state.selectedSessionKey);
    const setSelectedSessionKey = useAiChatStore((state) => state.setSelectedSessionKey);
    const beeatlasUserId = useAuthStore((state) => state.beeatlasUserId);

    const context = usePageContextStore((state) => state.context);

    const { data: sessions } = useGetAllUserSessionsQuery(
        beeatlasUserId ?? 0,
        hasProcessingSessions && isOpen,
    );
    const { mutateAsync: createSession } = usePostSessionMutation();
    const { mutateAsync: sendMessage } = usePostMessageMutation(selectedSessionKey);
    const groupedSessions = groupSessionsByDate(sessions ?? [], pinnedSessionKeys);
    const { data: sessionMessages, refetch: refetchSessionMessages } =
        useGetSessionHistoryQuery(selectedSessionKey);

    const selectedSession = sessions?.find((session) => session.key === selectedSessionKey) ?? null;
    const messageGroups = groupMessagesByDate(
        sessionMessages,
        lastSentMessage,
        selectedSession,
        error,
        context,
    );

    useEffect(() => {
        if (sessions) {
            setHasProcessingSessions(sessions.some((session) => session.status === 'process'));
        }
    }, [sessions]);

    useEffect(() => {
        setError(null);
    }, [selectedSessionKey]);

    useEffect(() => {
        if (selectedSession?.status === 'error') {
            setError('Ошибка обработки ответа');
        }
    }, [selectedSession]);

    useEffect(() => {
        if (selectedSession) {
            if (selectedSession.status === 'process') {
                setLastSentMessage(selectedSession.lastMessage);
            } else if (selectedSession.status === 'ready') {
                setLastSentMessage(null);
                refetchSessionMessages();
            } else if (selectedSession.status === 'error') {
                setLastSentMessage(null);
            }
        }
    }, [selectedSession]);

    const handleSend = async (startNewSession?: boolean) => {
        if (!prefillText.trim()) {
            return;
        }

        const messageText = prefillText;

        setError(null);
        setPrefillText('');
        setLastSentMessage(messageText);

        try {
            if (selectedSessionKey && !startNewSession) {
                await sendMessage({
                    message: messageText,
                    uiContext: context ? JSON.stringify(context) : '',
                });
            } else {
                const session = await createSession({
                    userId: beeatlasUserId ?? 0,
                    message: messageText,
                    uiContext: context ? JSON.stringify(context) : '',
                });

                setSelectedSessionKey(session.key);
            }
        } catch {
            setLastSentMessage(null);

            if (selectedSessionKey && !startNewSession) {
                setError('Не удалось отправить сообщение');
            } else {
                setError('Не удалось создать чат');
            }
        }
    };

    useEffect(() => {
        if (shouldSendMessage) {
            handleSend(true);
            setShouldSendMessage(false);
        }
    }, [shouldSendMessage]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const handleClose = () => {
        close();
    };

    const viewProps = {
        message: prefillText,
        onMessageChange: setPrefillText,
        onSend: () => handleSend(),
        onKeyDown: handleKeyDown,
        onClose: handleClose,
    };

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        isFullscreen ? (
            <FullscreenView
                {...viewProps}
                sessions={groupedSessions}
                messageGroups={messageGroups}
                onCollapse={() => setIsFullscreen(false)}
            />
        ) : (
            <SmallView
                {...viewProps}
                sessions={groupedSessions}
                messageGroups={messageGroups}
                onExpand={() => setIsFullscreen(true)}
            />
        ),
        document.body,
    );
};
