import React from 'react';

import search from '../../images/search.png';

import * as S from './units';

export const EmptyState = () => {
    return (
        <S.FlexContainer>
            <S.Image src={search} />
            <S.Text>
                {`Нет результатов, подходящих 
                под параметры поиска. 
                
                Попробуйте изменить запрос.`}
            </S.Text>
        </S.FlexContainer>
    );
};
