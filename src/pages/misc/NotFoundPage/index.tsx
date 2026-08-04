import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components/ui';

import error from './images/404-error.png';

import * as S from './units';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <S.Container>
            <S.Image src={error} />
            <S.Text>Что-то сломалось</S.Text>
            <S.SubText>Запрашиваемая страница не найдена, либо указана неверная ссылка</S.SubText>
            <S.ButtonContainer>
                <Button size="medium" variant="contained" onClick={handleClick}>
                    Вернуться на главную
                </Button>
            </S.ButtonContainer>
        </S.Container>
    );
};
