import React, { FC } from 'react';
import { generateMapColorGradient } from 'features/maps/utils';
import { useThemeStore } from 'features/theme';

import { IDynamicLegend } from './types';
import * as S from './units';

export const DynamicLegend: FC<IDynamicLegend> = ({ criteria }) => {
    const themeIsDark = useThemeStore((store) => store.themeIsDark);

    const gradient = generateMapColorGradient(themeIsDark, criteria.revers, criteria.interval ?? 2);

    return (
        <S.Wrapper>
            <S.Text>{criteria.revers ? criteria.maxDesc : criteria.minDesc}</S.Text>
            <S.TilesWrapper>
                {gradient.map((color, i) => (
                    <S.Item key={i}>
                        <S.Tile first={i === 0} last={i === gradient.length - 1} color={color} />
                    </S.Item>
                ))}
            </S.TilesWrapper>
            <S.Text>{criteria.revers ? criteria.minDesc : criteria.maxDesc}</S.Text>
        </S.Wrapper>
    );
};
