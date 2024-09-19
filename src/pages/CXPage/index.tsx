import React from 'react';

import { CardVariant } from 'components/interaction';

import * as R from 'router/const';
import * as STYLES from 'styles/units';

import * as S from './units';

export const CXPage = () => {
    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <STYLES.H2>Поддержка CX</STYLES.H2>

                <S.Description>
                    Здесь собраны все опубликованные артефакты всех команд, а также артефакты,
                    созданные членами вашей команды
                </S.Description>

                <S.CardContainer>
                    <S.CardStyled
                        variant={CardVariant.MAGENTA}
                        title="Библиотека CJ"
                        to={`${R.CX_PATH}${R.CJ_PATH}`}
                    >
                        CJ — это конечный набор взаимодействий человека с компанией, реализация
                        которого приводит к достижению целей как клиента, так и компании
                    </S.CardStyled>

                    <S.CardStyled
                        variant={CardVariant.TEAL}
                        title="Библиотека BI"
                        to={`${R.CX_PATH}${R.BI_PATH}`}
                    >
                        BI — выделяемые в составе CJ наборы действий, итогом которых является
                        законченный промежуточный результат, значимый с точки зрения решаемой
                        клиентом задачи
                    </S.CardStyled>
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
