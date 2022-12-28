import React from 'react';

import * as S from './units';

export const ModelsPage = () => {
    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <S.H2>Модели</S.H2>

                <S.CardContainer>
                    <S.CardStyled colorType="blue" title="Поиск возможностей в ФДМ" to="search">
                        Полнотекстовый поиск бизнес и технических возможностей на ландшафте компании
                    </S.CardStyled>

                    <S.CardStyled colorType="pink" title="ФДМ" to="fdm">
                        Функционально-Доменная Модель — это модель бизнес-возможностей ИТ-ландшафта
                        ВК, разработанная для обеспечения простой и удобной навигации в пространстве
                        возможностей по функциональному признаку.
                    </S.CardStyled>
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
