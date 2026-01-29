import { FC, useRef } from 'react';
import React from 'react';

import { useShowTooltip } from 'hooks';

import * as S from './units';

export const TooltipContainer: FC<{ text: string; tooltipId: string }> = ({ text, tooltipId }) => {
    const textRef = useRef<HTMLDivElement>(null);
    const showTooltip = useShowTooltip<HTMLDivElement>(textRef);

    return (
        <>
            <S.ClampedFileName ref={textRef} data-tooltip-id={showTooltip ? tooltipId : undefined}>
                {text}
            </S.ClampedFileName>
            {showTooltip && (
                <S.TooltipContainerPadding id={tooltipId} place="bottom" offset={8} noArrow>
                    {text}
                </S.TooltipContainerPadding>
            )}
        </>
    );
};
