import React, { FC } from 'react';
import { generateMapColorGradient } from 'features/maps/utils';
import { useThemeStore } from 'features/theme';

import { Text } from 'components/core';

import { IDynamicLegend } from './types';
import * as S from './units';

export const DynamicLegend: FC<IDynamicLegend> = ({ criteria }) => {
    const themeIsDark = useThemeStore((store) => store.themeIsDark);

    const gradient = generateMapColorGradient(
        themeIsDark,
        criteria.revers,
        criteria.interval ?? 2,
        criteria.threshold,
    );

    return (
        <S.Wrapper>
            <S.TilesWrapper>
                {gradient.map((color, i) => (
                    <S.Tile
                        key={i}
                        first={i === 0}
                        last={i === gradient.length - 1}
                        color={color}
                    />
                ))}
            </S.TilesWrapper>
            <S.TextWrapper>
                <Text inactive variant="body3">
                    {criteria.minDesc}
                </Text>
                <Text inactive variant="body3">
                    {criteria.maxDesc}
                </Text>
            </S.TextWrapper>
        </S.Wrapper>
    );
};
