import React from 'react';

import { BorderContainer } from 'components/containers';

import * as S from './units';

export const ArchCommPage = () => {
    return (
        <S.PageWrapper>
            <S.H3>Архитектурный комитет</S.H3>
            <S.GrayText>
                — коллегиальный орган, состоящий из вице-президентов компании и корпоративных
                архитекторов.
            </S.GrayText>

            <S.H4>Для чего был создан</S.H4>
            <ul>
                <S.GrayText>
                    <li>обеспечить гибкость и консистентность ИТ-ландшафта</li>
                </S.GrayText>

                <S.GrayText>
                    <li>ускорить time-to-market новых возможностей на уровне компании</li>
                </S.GrayText>

                <S.GrayText>
                    <li>обеспечить баланс между стоимостью разработки и гибкостью решения</li>
                </S.GrayText>

                <S.GrayText>
                    <li>улучшить возможности масштабирования, нагрузки, безопасности</li>
                </S.GrayText>

                <S.GrayText>
                    <li>обеспечить переиспользование знаний и технологий в компании</li>
                </S.GrayText>
            </ul>

            <S.H4>Состав и функции Архитектурного комитета</S.H4>
            <BorderContainer>
                <S.BoldTitle>Лица принимающие решения</S.BoldTitle>
            </BorderContainer>
        </S.PageWrapper>
    );
};
