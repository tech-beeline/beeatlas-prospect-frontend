import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components/ui';

import { MAIN_PAGE_PATH } from 'router/const';

import image from './images/empty-list.png';

import * as S from './units';

export const InDevelopmentBanner = () => {
    const navigate = useNavigate();

    return (
        <S.Wrapper>
            <S.Image src={image} />

            <S.Text>Раздел в разработке</S.Text>

            <Button variant="contained" onClick={() => navigate(MAIN_PAGE_PATH)}>
                Вернуться на главную
            </Button>
        </S.Wrapper>
    );
};
