import React, { FC } from 'react';

import { TECH_CAPABILITIES_COLORS } from './const';
import * as S from './units';

export const TechCapabilitiesLegend: FC = () => {
    return (
        <S.Wrapper>
            <S.Item>
                <S.Circle color={TECH_CAPABILITIES_COLORS[0]} />
                <S.Text>Отсутствуют ТС</S.Text>
            </S.Item>
            <S.Item>
                <S.Circle color={TECH_CAPABILITIES_COLORS[1]} />
                <S.Text>Не все ВС наполнены ТС</S.Text>
            </S.Item>
            <S.Item>
                <S.Circle color={TECH_CAPABILITIES_COLORS[2]} />
                <S.Text>ВС наполнены ТС</S.Text>
            </S.Item>
        </S.Wrapper>
    );
};
