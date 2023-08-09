import React from 'react';

import * as S from './units';
import * as STYLES from 'styles/units';

export const DataBasePage = () => {
    return (
        <S.PageWrapper className="PageWrapper">
            <S.ContentWrapper className="ContentWrapper">
                <STYLES.H2 className="H2">База знаний</STYLES.H2>

                <S.CardContainer className="CardContainer">
                    <S.CardStyled colorType="pink" title="Архитектурный комитет" to="arch-comm">
                        Раздел поможет подготовиться к защите концепции или продукта
                    </S.CardStyled>

                    <S.CardStyled colorType="blue" title="Техническая политика" to="tech-policy">
                        Познакомиться с основными принципами компании
                    </S.CardStyled>

                    <S.CardStyled colorType="green" title="Сервисные услуги" to="services">
                        Узнать подробнее об услугах корпоративной архитектуры и воспользоваться ими
                    </S.CardStyled>
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
