import React from 'react';

import { CardVariant } from 'components/interaction';

import * as R from 'router/const';
import * as STYLES from 'styles/units';

import * as S from './units';

export const DataBasePage = () => {
    return (
        <S.PageWrapper className="PageWrapper">
            <S.ContentWrapper className="ContentWrapper">
                <STYLES.H2 className="H2">База знаний</STYLES.H2>

                <S.CardContainer className="CardContainer">
                    <S.CardStyled
                        variant={CardVariant.MAGENTA}
                        title="Архитектурный комитет"
                        to={`${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}`}
                    >
                        Раздел поможет подготовиться к защите концепции или продукта
                    </S.CardStyled>

                    <S.CardStyled
                        variant={CardVariant.TEAL}
                        title="Техническая политика"
                        to={`${R.DATA_BASE_PATH}${R.TECH_POLICY_PATH}`}
                    >
                        Познакомиться с основными принципами компании
                    </S.CardStyled>

                    <S.CardStyled
                        variant={CardVariant.LEMON}
                        title="Сервисные услуги"
                        to={`${R.DATA_BASE_PATH}${R.SERVICES_PATH}`}
                    >
                        Узнать подробнее об услугах корпоративной архитектуры и воспользоваться ими
                    </S.CardStyled>
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
