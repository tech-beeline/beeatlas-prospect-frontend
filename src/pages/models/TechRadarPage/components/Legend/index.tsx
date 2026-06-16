import React, { FC } from 'react';

import * as S from './units';

export const Legend: FC = () => {
    return (
        <S.LegendContainer>
            <S.LegendItem>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={20} height={20}>
                    <circle cx={10} cy={10} r={10} fill="#B6B7BF" />
                </svg>
                <div>Без изменений</div>
            </S.LegendItem>
            <S.LegendItem>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={20} height={20}>
                    <circle
                        cx={10}
                        cy={10}
                        r={9}
                        fill="var(--color-background-base)"
                        stroke="#B6B7BF"
                        strokeWidth={2}
                    />
                </svg>
                <div>Новое</div>
            </S.LegendItem>
            <S.LegendItem>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={20} height={20}>
                    <polygon
                        points="2,16 10,2 18,16"
                        strokeLinejoin="round"
                        stroke="#B6B7BF"
                        fill="#B6B7BF"
                        strokeWidth={2}
                    />
                </svg>
                <div>Обновлено</div>
            </S.LegendItem>
        </S.LegendContainer>
    );
};
