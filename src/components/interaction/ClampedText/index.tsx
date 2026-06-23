import { FC, useRef } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';

import { TooltipContainer } from 'components/interaction';

import { useShowTooltip } from 'hooks';

import { IClampedText } from './types';
import * as S from './units';

export const ClampedText: FC<IClampedText> = ({ text, tooltipId, lines = 2, ...tooltipProps }) => {
    const textRef = useRef<HTMLDivElement>(null);
    const showTooltip = useShowTooltip<HTMLDivElement>(textRef);

    return (
        <>
            <S.ClampedFileName
                ref={textRef}
                data-tooltip-id={showTooltip ? tooltipId : undefined}
                lines={lines}
            >
                {text}
            </S.ClampedFileName>

            {showTooltip &&
                createPortal(
                    <TooltipContainer id={tooltipId} {...tooltipProps} positionStrategy="fixed">
                        {text}
                    </TooltipContainer>,
                    document.body,
                )}
        </>
    );
};
