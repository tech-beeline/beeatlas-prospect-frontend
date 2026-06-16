import React from 'react';

import notFound from 'pages/models/SearchPage/images/not-found.png';

import * as S from './units';

export const RefineRequestBlock = () => {
    return (
        <S.Container>
            <S.Image src={notFound} />
            <S.Text>
                {`Предложений, подходящих под параметры поиска слишком много 
                
                Уточните свой поисковой запрос`}
            </S.Text>
        </S.Container>
    );
};
