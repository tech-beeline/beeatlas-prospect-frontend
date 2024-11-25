import React, { FC } from 'react';
import { useThemeStore } from 'features/theme';

import { TECH_CAPABILITIES_COLORS_DARK_THEME, TECH_CAPABILITIES_COLORS_LIGHT_THEME } from './const';
import * as S from './units';

export const TechCapabilitiesLegend: FC = () => {
    const themeIsDark = useThemeStore((store) => store.themeIsDark);

    const colorArray = themeIsDark
        ? TECH_CAPABILITIES_COLORS_DARK_THEME
        : TECH_CAPABILITIES_COLORS_LIGHT_THEME;

    return (
        <S.Wrapper>
            <S.Item>
                <S.Circle color={colorArray[0]} />
                <S.Text>Отсутствуют ТС</S.Text>
            </S.Item>
            <S.Item>
                <S.Circle color={colorArray[1]} />
                <S.Text>Не все ВС наполнены ТС</S.Text>
            </S.Item>
            <S.Item>
                <S.Circle color={colorArray[2]} />
                <S.Text>ВС наполнены ТС</S.Text>
            </S.Item>
        </S.Wrapper>
    );
};
