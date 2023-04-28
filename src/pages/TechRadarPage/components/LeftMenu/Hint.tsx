import React, { FC } from 'react';

import * as STYLE from 'pages/TechRadarPage/units';

import * as T from './types';
import * as S from './units';

import 'react-tooltip/dist/react-tooltip.css';

// TODO: вынести + добавить пропс позиции
export const Hint: FC<T.IHint> = ({ text, tooltipId, children, ...props }) => {
    return (
        <S.HintWrapper {...props}>
            {(
                <span onClick={(e: any) => e.stopPropagation()} data-tooltip-id={tooltipId}>
                    {children}
                </span>
            ) || (
                <S.InfoIcon onClick={(e: any) => e.stopPropagation()} data-tooltip-id={tooltipId} />
            )}

            <S.TooltipStyled
                /* у каждой подсказки должен быть уникальный id */
                id={tooltipId}
                place="right"
                noArrow
            >
                <STYLE.HintText>{text}</STYLE.HintText>
            </S.TooltipStyled>
        </S.HintWrapper>
    );
};
