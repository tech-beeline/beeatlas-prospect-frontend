import React, { FC } from 'react';

import questionBox from './images/box-with-question.png';
import emptyBox from './images/empty-box.png';

import { INotFoundBlock } from './types';
import * as S from './units';

export const NotFoundBlock: FC<INotFoundBlock> = ({
    title,
    text = 'Такой страницы не существует или указана неверная ссылка',
    imageVariant = 'questionBox',
}) => {
    return (
        <S.NotFoundBlock>
            <S.Image src={imageVariant === 'questionBox' ? questionBox : emptyBox} />
            <div>
                {title && <S.Title>{title}</S.Title>}
                <S.Text marginTop={Boolean(title)}>{text}</S.Text>
            </div>
        </S.NotFoundBlock>
    );
};
