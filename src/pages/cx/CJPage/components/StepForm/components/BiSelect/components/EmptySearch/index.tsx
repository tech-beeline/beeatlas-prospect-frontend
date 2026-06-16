import React, { FC } from 'react';

import emptyBox from '../../../../images/empty-box.png';

import * as S from './units';

export const EmptySearch: FC = () => {
    return (
        <S.Container>
            <S.Image src={emptyBox} />
            <S.Title>Нет результатов, подходящих под параметры поиска</S.Title>
            <S.Subtitle>Попробуйте изменить запрос</S.Subtitle>
        </S.Container>
    );
};
