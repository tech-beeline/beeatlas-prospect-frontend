import React, { FC } from 'react';

import notFound from './images/box-with-question.png';

import { INotFoundBlock } from './types';
import * as S from './units';

export const NotFoundBlock: FC<INotFoundBlock> = ({
    text = 'Такой страницы не существует или указана неверная ссылка',
}) => {
    return (
        <S.NotFoundBlock>
            <S.Image src={notFound} />
            <S.Text>{text}</S.Text>
        </S.NotFoundBlock>
    );
};
