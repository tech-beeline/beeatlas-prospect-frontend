import React from 'react';

import notFound from 'pages/models/SearchPage/images/not-found.png';

import * as S from './units';

export const NotFoundBlock = () => {
    return (
        <S.NoFoundBlock className="NoFoundBlock">
            <S.Image src={notFound} />
            Нет результатов, подходящих под параметры поиска. Попробуйте изменить запрос.
        </S.NoFoundBlock>
    );
};
