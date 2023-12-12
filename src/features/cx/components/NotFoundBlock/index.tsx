import React from 'react';

import notFound from './images/box-with-question.png';

import * as S from './units';

export const NotFoundBlock = () => {
    return (
        <S.NotFoundBlock>
            <S.Image src={notFound} />
            <S.Text>Такой страницы не существует или указана неверная ссылка</S.Text>
        </S.NotFoundBlock>
    );
};
