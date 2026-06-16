import React, { FC } from 'react';

import { E2E_SCENARIOS_COLORS } from './const';
import * as S from './units';

export const ScenariosLegend: FC = () => {
    return (
        <S.Wrapper>
            <S.Item>
                <S.Tile first color={E2E_SCENARIOS_COLORS[0]} />
                <S.Text>0-5</S.Text>
            </S.Item>
            <S.Item>
                <S.Tile color={E2E_SCENARIOS_COLORS[1]} />
                <S.Text>6-10</S.Text>
            </S.Item>
            <S.Item>
                <S.Tile color={E2E_SCENARIOS_COLORS[2]} />
                <S.Text>11-15</S.Text>
            </S.Item>
            <S.Item>
                <S.Tile color={E2E_SCENARIOS_COLORS[3]} />
                <S.Text>16-20</S.Text>
            </S.Item>
            <S.Item>
                <S.Tile last color={E2E_SCENARIOS_COLORS[4]} />
                <S.Text>21-25+</S.Text>
            </S.Item>
        </S.Wrapper>
    );
};
