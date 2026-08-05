import React, { FC, useRef } from 'react';

import { TooltipContainer } from 'components/interaction';

import { useShowTooltip } from 'hooks';

import { ISuggestionChip } from './types';
import * as S from './units';

export const SuggestionChip: FC<ISuggestionChip> = ({ label, sessionKey, onClick }) => {
    const titleRef = useRef<HTMLSpanElement>(null);
    const showTooltip = useShowTooltip(titleRef);
    const tooltipId = `suggestion-chip-${sessionKey}`;

    return (
        <>
            <S.ChipStyled type="button" onClick={onClick}>
                <S.ChipTitle ref={titleRef} data-tooltip-id={showTooltip ? tooltipId : undefined}>
                    {label}
                </S.ChipTitle>
            </S.ChipStyled>
            {showTooltip && (
                <TooltipContainer id={tooltipId} offset={8} place="bottom" noArrow>
                    {label}
                </TooltipContainer>
            )}
        </>
    );
};
