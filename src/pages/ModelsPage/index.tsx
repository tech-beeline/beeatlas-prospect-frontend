import React from 'react';

import * as S from './units';

export const ModelsPage = () => {
    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <S.H2>Модели</S.H2>

                <S.CardContainer>
                    <S.CardStyled colorType="blue" title="Поиск возможностей в ФДМ" to="search">
                        Познакомиться с основными принципами компании
                    </S.CardStyled>

                    <S.CardStyled colorType="pink" title="ФДМ" to="fdm">
                        Раздел поможет подготовиться к защите концепции или продукта
                    </S.CardStyled>
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
