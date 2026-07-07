import React, { FC, useState } from 'react';
import { useAiChatStore } from 'features/ai/store';

import { Text } from 'components/core';
import { Button, Icon, IconButton, MessageField } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { FullscreenViewProps } from '../../types';
import { Message } from '../Message';

import { HistoryItem } from './components';
import * as S from './units';

export const FullscreenView: FC<FullscreenViewProps> = ({
    sessions,
    message,
    onMessageChange,
    onSend,
    onKeyDown,
    onClose,
    onCollapse,
    messageGroups,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
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
                        iconName={Icons.Collapse}
                        aria-label="Свернуть"
                        size="large"
                        onClick={onCollapse}
                    />
                    <IconButton
                        iconName={Icons.Close}
                        aria-label="Закрыть"
                        size="large"
                        onClick={onClose}
                    />
                </S.HeaderActions>
            </S.Header>

            <S.Content>
                <S.Sidebar>
                    <S.SidebarHeader>
                        <Button
                            variant="outlined"
                            size="medium"
                            fullWidth
                            startIcon={<Icon iconName={Icons.ChatAdd} />}
                            onClick={() => setSelectedSessionKey(null)}
                        >
                            Новый чат
                        </Button>
                    </S.SidebarHeader>

                    <S.SidebarContent>
                        {sessions.length === 0 && (
                            <S.NoSessions>
                                <Text inactive variant="body3">
                                    Нет сессий
                                </Text>
                            </S.NoSessions>
                        )}
                        {sessions.map((section) => (
                            <S.HistorySection key={section.title}>
                                <S.HistorySectionTitle>
                                    <Text inactive variant="overline">
                                        {section.title}
                                    </Text>
                                    {section.pinned && (
                                        <IconButton
                                            iconName={
                                                isCollapsed ? Icons.NavArrowDown : Icons.NavArrowUp
                                            }
                                            aria-label={
                                                isCollapsed
                                                    ? 'Развернуть секцию'
                                                    : 'Свернуть секцию'
                                            }
                                            size="small"
                                            onClick={() => setIsCollapsed((prev) => !prev)}
                                        />
                                    )}
                                </S.HistorySectionTitle>
                                {!(section.pinned && isCollapsed) &&
                                    section.items.map((session) => (
                                        <HistoryItem
                                            key={session.key}
                                            sessionKey={session.key}
                                            title={session.description || session.lastMessage}
                                        />
                                    ))}
                            </S.HistorySection>
                        ))}
                    </S.SidebarContent>
                </S.Sidebar>

                <S.Main>
                    <S.MessagesArea $isEmpty={!selectedSessionKey && messageGroups.length === 0}>
                        {!selectedSessionKey && messageGroups.length === 0 ? (
                            <S.WelcomeBlock>
                                <Text variant="h4">Я ваш AI-помощник по beeatlas</Text>
                                <Text inactive variant="body3">
                                    Помогаю быстро находить ответы и разбираться в работе платформы.
                                    Я всё ещё учусь, поэтому могу ошибаться, но стараюсь быть
                                    полезным.
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
                    </S.MessagesArea>

                    <S.InputArea>
                        <S.InputSection>
                            <S.InputRow>
                                <MessageField
                                    fullWidth
                                    value={message}
                                    onChange={(event) => onMessageChange(event.target.value)}
                                    onKeyDown={onKeyDown}
                                    placeholder="Введите запрос"
                                />
                                <Button
                                    variant="message"
                                    size="small"
                                    startIcon={<Icon iconName={Icons.Send} />}
                                    onClick={onSend}
                                    disabled={!message.trim()}
                                    aria-label="Отправить"
                                />
                            </S.InputRow>
                        </S.InputSection>
                    </S.InputArea>
                </S.Main>
            </S.Content>
        </S.Container>
    );
};
