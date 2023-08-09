import React from 'react';

import * as S from './units';
import * as STYLES from 'styles/units';

export const ModelsPage = () => {
    return (
        <S.PageWrapper className="PageWrapper">
            <S.ContentWrapper className="ContentWrapper">
                <STYLES.H2 className="H2">Модели</STYLES.H2>

                <S.CardContainer className="CardContainer">
                    <S.CardStyled colorType="blue" title="Поиск возможностей в ФДМ" to="search">
                        Полнотекстовый поиск бизнес и технических возможностей на ландшафте компании
                    </S.CardStyled>

                    <S.CardStyled colorType="pink" title="ФДМ" to="fdm">
                        Функционально-Доменная Модель — это модель бизнес-возможностей ИТ-ландшафта
                        ВК, разработанная для обеспечения простой и удобной навигации в пространстве
                        возможностей по функциональному признаку.
                    </S.CardStyled>

                    <S.CardStyled colorType="green" title="Технорадар" to="tech-radar">
                        Диаграмма, на которой можно увидеть технологии и инструменты, которые
                        используются в компании
                    </S.CardStyled>
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
