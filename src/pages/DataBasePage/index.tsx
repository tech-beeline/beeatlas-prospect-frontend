import React from 'react';

import * as S from './units';

export const DataBasePage = () => {
    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <S.H2>База знаний</S.H2>

                <S.CardContainer>
                    <S.CardStyled colorType="pink" title="Архитектурный комитет" to="arch-comm">
                        Раздел поможет подготовиться к защите концепции или продукта
                    </S.CardStyled>

                    <S.CardStyled colorType="blue" title="Техническая политика">
                        Познакомиться с основными принципами компании
                    </S.CardStyled>

                    <S.CardStyled colorType="green" title="Сервисные услуги" to="services">
                        Узнать подробнее об услугах Энтерпрайз архитектуры и воспользоваться ими
                    </S.CardStyled>
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
