import React, { FC, useRef } from 'react';
import { useAiChatStore } from 'features/ai/store';

import { DropdownMenu, TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';

import { useDeleteSessionMutation } from 'api/queries/ai-chat';
import { useShowTooltip } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IHistoryItem } from './types';
import * as S from './units';

export const HistoryItem: FC<IHistoryItem> = ({ sessionKey, title }) => {
    const selectedSessionKey = useAiChatStore((state) => state.selectedSessionKey);
    const setSelectedSessionKey = useAiChatStore((state) => state.setSelectedSessionKey);
    const setPinnedSessions = useAiChatStore((state) => state.setPinnedSessions);
    const pinnedSessionKeys = useAiChatStore((state) => state.pinnedSessions);
    const isPinned = pinnedSessionKeys.includes(sessionKey);

    const { mutateAsync: deleteSession } = useDeleteSessionMutation();

    const titleRef = useRef<HTMLDivElement>(null);
    const showTitleTooltip = useShowTooltip(titleRef);
    const titleTooltipId = `history-title-${sessionKey}`;

    const handleDeleteClick = async () => {
        await deleteSession(sessionKey);
        if (sessionKey === selectedSessionKey) {
            setSelectedSessionKey(null);
        }
    };

    const handlePinSession = () => {
        if (isPinned) {
            setPinnedSessions(pinnedSessionKeys.filter((key) => key !== sessionKey));
        } else {
            setPinnedSessions([...pinnedSessionKeys, sessionKey]);
        }
    };

    return (
        <S.Container
            selected={sessionKey === selectedSessionKey}
            onClick={() => setSelectedSessionKey(sessionKey)}
        >
            <S.Title ref={titleRef} data-tooltip-id={titleTooltipId}>
                {title}
            </S.Title>
            {showTitleTooltip && (
                <TooltipContainer id={titleTooltipId} offset={8} place="bottom" noArrow>
                    {title}
                </TooltipContainer>
            )}
            <S.MenuWrapper onClick={(event) => event.stopPropagation()}>
                <DropdownMenu
                    id={sessionKey}
                    usePortal
                    position="left"
                    items={[
                        [
                            {
                                title: isPinned ? 'Открепить' : 'Закрепить',
                                icon: isPinned ? Icons.PinFull : Icons.Pinnned,
                                onClick: handlePinSession,
                            },
                            {
                                title: 'Удалить',
                                icon: Icons.Delete,
                                onClick: handleDeleteClick,
                            },
                        ],
                    ]}
                >
                    <IconButton iconName={Icons.MoreVert} aria-label="Действия" size="medium" />
                </DropdownMenu>
            </S.MenuWrapper>
        </S.Container>
    );
};
