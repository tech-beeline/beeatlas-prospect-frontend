import React, { useState } from 'react';
import { useAiChatStore } from 'features/ai';
import { useAuthStore } from 'features/auth';
import { SuggestionChip } from 'features/components';

import { Button, Icon, Skeleton, TextField } from 'components/ui';

import { useGetAllUserSessionsQuery } from 'api/queries/ai-chat';
import { Icons } from 'styles/design-tokens/js/iconfont';

import * as S from './units';

export const AiAssistantInput = () => {
    const [message, setMessage] = useState('');
    const openAiChat = useAiChatStore((state) => state.open);
    const setShouldSendMessage = useAiChatStore((state) => state.setShouldSendMessage);
    const setSelectedSessionKey = useAiChatStore((state) => state.setSelectedSessionKey);

    const beeatlasUserId = useAuthStore((state) => state.beeatlasUserId);

    const { data: sessions, isLoading: isLoadingSessions } = useGetAllUserSessionsQuery(
        beeatlasUserId ?? 0,
        false,
    );

    const recentSessions = sessions?.slice(0, 5);

    const handleSend = () => {
        if (!message.trim()) {
            return;
        }

        openAiChat(message.trim(), { fullscreen: true });
        setShouldSendMessage(true);
        setMessage('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const handleSuggestionClick = (sessionKey: string) => {
        setSelectedSessionKey(sessionKey);
        openAiChat('', { fullscreen: true });
    };

    return (
        <S.InputSection>
            <S.InputRow>
                <TextField
                    fullWidth
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Введите запрос"
                    startAdornment={<Icon iconName={Icons.AiAssistant} />}
                />
                <Button
                    variant="message"
                    size="medium"
                    startIcon={<Icon iconName={Icons.Send} />}
                    onClick={handleSend}
                    disabled={!message.trim()}
                    aria-label="Отправить"
                />
            </S.InputRow>

            <S.Suggestions>
                {isLoadingSessions &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} height={32} width={100} radius={16} />
                    ))}
                {recentSessions?.map((session) => (
                    <SuggestionChip
                        key={session.key}
                        sessionKey={session.key}
                        label={session.description ?? session.lastMessage}
                        onClick={() => handleSuggestionClick(session.key)}
                    />
                ))}
            </S.Suggestions>
        </S.InputSection>
    );
};
