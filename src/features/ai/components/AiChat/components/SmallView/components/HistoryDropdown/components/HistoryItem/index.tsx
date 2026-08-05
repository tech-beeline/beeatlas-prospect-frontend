import React, { FC, useRef } from 'react';
import { useAiChatStore } from 'features/ai/store';

import { TooltipContainer } from 'components/interaction';

import { useShowTooltip } from 'hooks';

import { IHistoryItem } from './types';
import * as S from './units';

export const HistoryItem: FC<IHistoryItem> = ({ session, handleSessionClick }) => {
    const selectedSessionKey = useAiChatStore((state) => state.selectedSessionKey);
    const titleRef = useRef<HTMLDivElement>(null);
    const showTitleTooltip = useShowTooltip(titleRef);
    const titleTooltipId = `history-title-${session.key}`;

    return (
        <S.HistoryItem
            onClick={() => handleSessionClick(session.key)}
            selected={session.key === selectedSessionKey}
        >
            <S.Title ref={titleRef} data-tooltip-id={titleTooltipId}>
                {session.description || session.lastMessage}
            </S.Title>
            {showTitleTooltip && (
                <TooltipContainer
                    largeWidth={false}
                    id={titleTooltipId}
                    place="bottom"
                    fixedWidth={180}
                    noArrow
                >
                    {session.description || session.lastMessage}
                </TooltipContainer>
            )}
        </S.HistoryItem>
    );
};
