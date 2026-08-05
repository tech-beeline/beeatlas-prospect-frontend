import React, { FC } from 'react';
import { useAiChatStore } from 'features/ai/store';

import { Text } from 'components/core';
import { Button, Icon, IconButton, MessageField } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { SmallViewProps } from '../../types';
import { Message } from '../Message';

import { HistoryDropdown } from './components';
import * as S from './units';

export const SmallView: FC<SmallViewProps> = ({
    sessions,
    message,
    onMessageChange,
    onSend,
    onKeyDown,
    onClose,
    onExpand,
    messageGroups,
}) => {
    const selectedSessionKey = useAiChatStore((state) => state.selectedSessionKey);
    const setSelectedSessionKey = useAiChatStore((state) => state.setSelectedSessionKey);

    return (
        <S.Container>
            <S.Header>
                <S.HeaderTitle>
                    <Icon iconName={Icons.AiAssistant} size="large" />
                    <Text variant="subtitle1">AI-помощник</Text>
                </S.HeaderTitle>
                <S.HeaderActions>
                    <IconButton
                        iconName={Icons.ChatAdd}
                        aria-label="Новый чат"
                        size="large"
                        onClick={() => setSelectedSessionKey(null)}
                    />
                    <HistoryDropdown sessions={sessions}>
                        <IconButton iconName={Icons.Clock} aria-label="История" size="large" />
                    </HistoryDropdown>
                    <IconButton
                        iconName={Icons.Expand}
                        aria-label="Развернуть"
                        size="large"
                        onClick={onExpand}
                    />
                    <IconButton
                        iconName={Icons.Close}
                        aria-label="Закрыть"
                        size="large"
                        onClick={onClose}
                    />
                </S.HeaderActions>
            </S.Header>

            <S.Body $isEmpty={!selectedSessionKey && messageGroups.length === 0}>
                {!selectedSessionKey && messageGroups.length === 0 ? (
                    <S.WelcomeBlock>
                        <Text variant="subtitle2">Я ваш AI-помощник по beeatlas</Text>
                        <Text inactive variant="body2">
                            Помогаю быстро находить ответы и разбираться в работе платформы. Я всё
                            ещё учусь, поэтому могу ошибаться, но стараюсь быть полезным.
                            <br />
                            Чем могу помочь?
                        </Text>
                    </S.WelcomeBlock>
                ) : (
                    <>
                        {messageGroups.map((group) => (
                            <React.Fragment key={group.dateKey}>
                                <S.MessagesList>
                                    {group.messages.map((item, index) => (
                                        <Message
                                            key={`${item.message.createdAt}-${item.message.role}-${index}`}
                                            message={item.message}
                                            isLoading={item.isLoading}
                                            error={item.error}
                                            contextLabel={item.contextLabel}
                                        />
                                    ))}
                                </S.MessagesList>
                                <S.DateSeparator>
                                    <Text inactive variant="caption">
                                        {group.title}
                                    </Text>
                                </S.DateSeparator>
                            </React.Fragment>
                        ))}
                    </>
                )}
            </S.Body>

            <S.Footer>
                <MessageField
                    fullWidth
                    value={message}
                    onChange={(event) => onMessageChange(event.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Управление коммуникациями"
                />
                <Button
                    variant="message"
                    size="small"
                    startIcon={<Icon iconName={Icons.Send} />}
                    onClick={onSend}
                    disabled={!message.trim()}
                    aria-label="Отправить"
                />
            </S.Footer>
        </S.Container>
    );
};
