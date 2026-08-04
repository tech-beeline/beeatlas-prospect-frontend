import React, { FC, useId } from 'react';

import { TooltipContainer } from 'components/interaction';

import { typeToBackgroundColorMap, typeToIconMap, typeToNameMap } from './const';
import { IIconFeeling } from './types';
import * as S from './units';

export const IconFeeling: FC<IIconFeeling> = ({ type, onClick, isActive = false }) => {
    const id = useId();
    return (
        <>
            <S.Container
                onClick={onClick}
                isActive={isActive}
                style={{ backgroundColor: typeToBackgroundColorMap[type] }}
                data-tooltip-id={id}
            >
                <img src={typeToIconMap[type]} />
            </S.Container>

            <TooltipContainer id={id} offset={5} place="bottom" noArrow>
                {typeToNameMap[type]}
            </TooltipContainer>
        </>
    );
};

export { FeelingTypes } from './types';
