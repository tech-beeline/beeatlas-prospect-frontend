import React, { FC } from 'react';
import Markdown from 'react-markdown';
import dayjs from 'dayjs';
import { useAiChatStore } from 'features/ai/store';
import { MarkdownLinkRenderer } from 'features/technologies';
import remarkGfm from 'remark-gfm';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IMessage } from './types';
import * as S from './units';
import { splitFirstSentence } from './utils';

export const Message: FC<IMessage> = ({
    message,
    isLoading = false,
    error = false,
    contextLabel,
}) => {
    const setPrefillText = useAiChatStore((state) => state.setPrefillText);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { content, role, createdAt } = message;
    const isUser = role === 'user';

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(content);
        showSnackbar({ message: 'Текст скопирован' });
    };

    const handleRetryClick = () => {
        setPrefillText(message.content);
    };

    if (isUser) {
        return (
            <S.Container $isUser>
                <S.Bubble $isUser>
                    <S.TextContent>
                        <Text variant="body2">{content}</Text>
                    </S.TextContent>
                    <S.Timestamp>
                        <Text inactive variant="caption">
                            {dayjs(createdAt).format('HH:mm')}
                        </Text>
                    </S.Timestamp>
                </S.Bubble>
                <S.Actions>
                    <IconButton
                        iconName={Icons.Copy}
                        aria-label="Копировать"
                        size="small"
                        variant="plain"
                        onClick={handleCopyClick}
                    />
                    <IconButton
                        iconName={Icons.Refresh}
                        aria-label="Повторить"
                        size="small"
                        variant="plain"
                        onClick={handleRetryClick}
                    />
                </S.Actions>
            </S.Container>
        );
    }

    const { firstSentence, rest } = isLoading
        ? splitFirstSentence(content)
        : { firstSentence: '', rest: content };

    return (
        <S.Container $isUser={false}>
            <S.SenderLabel>
                <Text inactive variant="caption">
                    {contextLabel
                        ? `AI помощник, контекст по странице ${contextLabel}`
                        : 'AI помощник'}
                </Text>
            </S.SenderLabel>
            <S.Bubble $isUser={false} $isError={error}>
                <S.TextContent>
                    {isLoading ? (
                        <Text variant="body2">
                            <strong>{firstSentence}</strong>
                            {rest ? ` ${rest}` : null}
                        </Text>
                    ) : error ? (
                        <Text variant="body2">{content}</Text>
                    ) : (
                        <S.MarkdownContent>
                            <Markdown
                                components={{ a: MarkdownLinkRenderer }}
                                urlTransform={(v) => v}
                                remarkPlugins={[remarkGfm]}
                            >
                                {content}
                            </Markdown>
                        </S.MarkdownContent>
                    )}
                </S.TextContent>
                {isLoading && <S.ProgressBar />}
                {!error && (
                    <S.Timestamp>
                        <Text inactive variant="caption">
                            {dayjs(createdAt).format('HH:mm')}
                        </Text>
                    </S.Timestamp>
                )}
            </S.Bubble>
            {!isLoading && !error && (
                <S.Actions>
                    <IconButton
                        iconName={Icons.Copy}
                        aria-label="Копировать"
                        size="small"
                        variant="plain"
                        onClick={handleCopyClick}
                    />
                </S.Actions>
            )}
        </S.Container>
    );
};
