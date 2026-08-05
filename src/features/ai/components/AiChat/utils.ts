import dayjs from 'dayjs';
import { PageContext } from 'features/ai-context/store/types';
import { getSessionContextLabel, isUiContextEqual } from 'features/ai-context/utils';

import { ISession, ISessionMessage } from 'api/ai-chat/types';

import { ChatHistorySection, ChatMessageGroup, ChatMessageItem } from './types';

const SECTION_TITLES = {
    pinned: 'Закреплено',
    today: 'Сегодня',
    last7Days: 'Последние 7 дней',
    earlier: 'Ранее',
} as const;

const sortByUpdatedAtDesc = (a: ISession, b: ISession) =>
    dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf();

export const groupSessionsByDate = (
    sessions: ISession[],
    pinnedSessionKeys: string[],
): ChatHistorySection[] => {
    const pinnedKeysSet = new Set(pinnedSessionKeys);
    const now = dayjs();

    const pinnedItems = pinnedSessionKeys
        .map((key) => sessions.find((session) => session.key === key))
        .filter((session): session is ISession => session !== undefined);

    const today: ISession[] = [];
    const last7Days: ISession[] = [];
    const earlier: ISession[] = [];
    const sevenDaysAgoStart = now.startOf('day').subtract(7, 'day');

    sessions
        .filter((session) => !pinnedKeysSet.has(session.key))
        .forEach((session) => {
            const date = dayjs(session.updatedAt);

            if (date.isSame(now, 'day')) {
                today.push(session);
                return;
            }

            if (!date.isBefore(sevenDaysAgoStart)) {
                last7Days.push(session);
                return;
            }

            earlier.push(session);
        });

    const sections: ChatHistorySection[] = [];

    if (pinnedItems.length > 0) {
        sections.push({
            title: SECTION_TITLES.pinned,
            items: pinnedItems,
            pinned: true,
        });
    }

    if (today.length > 0) {
        sections.push({
            title: SECTION_TITLES.today,
            items: today.sort(sortByUpdatedAtDesc),
        });
    }

    if (last7Days.length > 0) {
        sections.push({
            title: SECTION_TITLES.last7Days,
            items: last7Days.sort(sortByUpdatedAtDesc),
        });
    }

    if (earlier.length > 0) {
        sections.push({
            title: SECTION_TITLES.earlier,
            items: earlier.sort(sortByUpdatedAtDesc),
        });
    }

    return sections;
};

const PROCESSING_ASSISTANT_MESSAGE =
    'Думаю над ответом. Я только учусь и могу ошибаться: если что-то пошло не так, уточните, и я попробую снова!';

const formatMessageDateLabel = (date: dayjs.Dayjs, now: dayjs.Dayjs): string => {
    if (date.isSame(now, 'day')) {
        return SECTION_TITLES.today;
    }

    if (date.isSame(now.subtract(1, 'day'), 'day')) {
        return 'Вчера';
    }

    return date.format('DD.MM.YYYY');
};

// Если после user идут 2+ подряд assistant-сообщения — оставляем только последнее
const keepLastConsecutiveAssistant = (items: ChatMessageItem[]): ChatMessageItem[] =>
    items.filter((item, index, list) => {
        if (item.message.role !== 'assistant') {
            return true;
        }

        return list[index + 1]?.message.role !== 'assistant';
    });

const attachContextLabelToLastAssistant = (
    groups: ChatMessageGroup[],
    contextLabel: string,
): ChatMessageGroup[] => {
    for (const group of groups) {
        for (let index = group.messages.length - 1; index >= 0; index -= 1) {
            if (group.messages[index].message.role === 'assistant') {
                group.messages[index] = {
                    ...group.messages[index],
                    contextLabel,
                };

                return groups;
            }
        }
    }

    return groups;
};

export const groupMessagesByDate = (
    sessionMessages: ISessionMessage[] | undefined,
    lastSentMessage: string | null,
    selectedSession: ISession | null,
    error: string | null,
    currentContext: PageContext | null,
): ChatMessageGroup[] => {
    const now = dayjs();
    const items: ChatMessageItem[] = (sessionMessages ?? []).map((message) => ({ message }));

    if (lastSentMessage) {
        items.push(
            {
                message: {
                    content: lastSentMessage,
                    role: 'user',
                    createdAt:
                        selectedSession?.updatedAt ??
                        selectedSession?.createdAt ??
                        new Date().toISOString(),
                },
            },
            {
                message: {
                    content: PROCESSING_ASSISTANT_MESSAGE,
                    role: 'assistant',
                    createdAt:
                        selectedSession?.updatedAt ??
                        selectedSession?.createdAt ??
                        new Date().toISOString(),
                },
                isLoading: true,
            },
        );
    }

    const groupsMap = new Map<string, ChatMessageGroup>();

    keepLastConsecutiveAssistant(items).forEach((item) => {
        const date = dayjs(item.message.createdAt);
        const dateKey = date.format('YYYY-MM-DD');

        if (!groupsMap.has(dateKey)) {
            groupsMap.set(dateKey, {
                dateKey,
                title: formatMessageDateLabel(date, now),
                messages: [],
            });
        }

        groupsMap.get(dateKey)!.messages.push(item);
    });

    const groups = Array.from(groupsMap.values()).sort(
        (a, b) => dayjs(b.dateKey).valueOf() - dayjs(a.dateKey).valueOf(),
    );

    if (error) {
        const errorItems: ChatMessageItem[] = [
            {
                message: {
                    content: selectedSession?.lastMessage ?? '',
                    role: 'user',
                    createdAt:
                        selectedSession?.updatedAt ??
                        selectedSession?.createdAt ??
                        now.toISOString(),
                },
            },
            {
                message: {
                    content: error,
                    role: 'assistant',
                    createdAt:
                        selectedSession?.updatedAt ??
                        selectedSession?.createdAt ??
                        now.toISOString(),
                },
                error: true,
            },
        ];

        if (groups.length === 0) {
            groups.push({
                dateKey: now.format('YYYY-MM-DD'),
                title: formatMessageDateLabel(now, now),
                messages: errorItems,
            });
        } else {
            groups[0].messages.push(...errorItems);
        }
    }

    const contextLabel = getSessionContextLabel(selectedSession?.uiContext ?? null);

    if (contextLabel) {
        attachContextLabelToLastAssistant(groups, contextLabel);
    }

    const sessionUiContext = selectedSession?.uiContext;

    if (sessionUiContext && !isUiContextEqual(sessionUiContext, currentContext)) {
        const currentContextLabel = getSessionContextLabel(JSON.stringify(currentContext));

        const contextChangeItem: ChatMessageItem = {
            message: {
                content: currentContextLabel
                    ? `Ищу теперь по ${currentContextLabel}`
                    : 'Теперь ищу без контекста',
                role: 'assistant',
                createdAt: now.toISOString(),
            },
            contextLabel: currentContextLabel ?? undefined,
        };

        if (groups.length === 0) {
            groups.push({
                dateKey: now.format('YYYY-MM-DD'),
                title: formatMessageDateLabel(now, now),
                messages: [contextChangeItem],
            });
        } else {
            groups[0].messages.push(contextChangeItem);
        }
    }

    return groups;
};
