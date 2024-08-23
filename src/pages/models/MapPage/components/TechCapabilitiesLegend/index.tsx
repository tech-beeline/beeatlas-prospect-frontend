import React, { FC } from 'react';

import * as S from './units';

export const TechCapabilitiesLegend: FC = () => {
    return (
        <S.Wrapper>
            <S.Item>
                <S.Circle color="var(--color-status-error-background)" />
                <S.Text>Отсутствуют ТС</S.Text>
            </S.Item>
            <S.Item>
                <S.Circle color="var(--color-status-warning-background)" />
                <S.Text>Не все ВС наполнены ТС</S.Text>
            </S.Item>
            <S.Item>
                <S.Circle color="var(--color-status-success-background)" />
                <S.Text>ВС наполнены ТС</S.Text>
            </S.Item>
        </S.Wrapper>
    );
};
