import React, { FC } from 'react';

import * as STYLE from 'pages/models/TechRadarPage/units';

import * as T from './types';
import * as S from './units';

import 'react-tooltip/dist/react-tooltip.css';

// TODO: вынести + добавить пропс позиции
export const Hint: FC<T.IHint> = ({ text, tooltipId, children, ...props }) => {
    return (
        <S.HintWrapper {...props}>
            {props.isInfo ? (
                <S.InfoIcon onClick={(e: any) => e.stopPropagation()} data-tooltip-id={tooltipId} />
            ) : (
                <span onClick={(e: any) => e.stopPropagation()} data-tooltip-id={tooltipId}>
                    {children}
                </span>
            )}

            <S.TooltipStyled
                // у каждой подсказки должен быть уникальный id
                id={tooltipId}
                place="bottom"
                noArrow
            >
                <STYLE.HintText>{text}</STYLE.HintText>
            </S.TooltipStyled>
        </S.HintWrapper>
    );
};
