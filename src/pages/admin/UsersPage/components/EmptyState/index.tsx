import React from 'react';

import search from './images/search.png';

import * as S from './units';

export const EmptyState = () => {
    return (
        <S.FlexContainer>
            <S.Image src={search} />
            <S.Text>Нет результатов, подходящих</S.Text>
            <S.Text>под параметры поиска.</S.Text>
            <S.Text>{'\n'}</S.Text>
            <S.Text>Попробуйте изменить запрос.</S.Text>
        </S.FlexContainer>
    );
};
