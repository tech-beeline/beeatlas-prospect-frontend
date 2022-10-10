import React from 'react';

import { BorderContainer } from 'components/containers';
import { IconText } from 'components/other';

import human1 from './images/human1.jpg';
import human2 from './images/human2.jpg';
import human3 from './images/human3.jpg';
import human4 from './images/human4.jpg';
import { HumanCard } from './HumanCard';
import * as S from './units';

export const ArchCommPage = () => {
    return (
        <S.PageWrapper>
            <S.H3>Архитектурный комитет</S.H3>
            <S.GrayText style={{ marginBottom: '32px' }}>
                — коллегиальный орган, состоящий из вице-президентов компании и корпоративных
                архитекторов.
            </S.GrayText>

            <S.H4 style={{ marginBottom: '12px' }}>Для чего был создан</S.H4>
            <ul style={{ marginBottom: '50px' }}>
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

            <S.H4 style={{ marginBottom: '40px' }}>Состав и функции Архитектурного комитета</S.H4>
            <BorderContainer style={{ marginBottom: '24px' }}>
                <S.Container>
                    <S.BoldTitle>Лица принимающие решения</S.BoldTitle>

                    <HumanCard
                        avatar={human1}
                        secondName="Рубенчик"
                        firstName="Антон Владимирович"
                        description="Вице-президент по информационным технологиям. 
Блок по информационным технологиям"
                    />

                    <HumanCard
                        avatar={human2}
                        secondName="Бардинцев"
                        firstName="Игорь Юрьевич"
                        description="Вице-президент по работе с данными. 
Блок по работе с данными"
                    />

                    <HumanCard
                        avatar={human3}
                        secondName="Шоржин"
                        firstName="Валерий Викторович"
                        description="Исполнительный вице-президент по технике. 
Технический блок"
                    />
                </S.Container>

                <S.Container>
                    <S.BoldTitle>Функции</S.BoldTitle>

                    <IconText icon="Notification" text="Принятие решений" color="info" />
                    <IconText icon="Suitcase" text="Развитие ИТ-ландшафта" color="warning" />
                    <IconText icon="Flash" text="Разрешение конфликтов" color="teal" />
                    <IconText icon="PagesMultipleAdd" text="Инициация проектов" color="magenta" />
                    <IconText icon="PageSearch" text="Утверждение техполитики" color="purple" />
                </S.Container>
            </BorderContainer>

            <BorderContainer style={{ marginBottom: '24px' }}>
                <S.Container>
                    <S.BoldTitle>Центр развития корпоративной архитектуры</S.BoldTitle>

                    <HumanCard
                        firstName="Руководитель центра"
                        description="Вице-президент по информационным технологиям. 
Блок по информационным технологиям"
                    />

                    <HumanCard
                        firstName="Корпоративные архитекторы"
                        description="Вице-президент по работе с данными. 
Блок по работе с данными"
                    />
                </S.Container>

                <S.Container>
                    <S.BoldTitle>Функции</S.BoldTitle>

                    <IconText icon="Notification" text="Оппонирование" color="info" />
                    <IconText icon="Suitcase" text="Консультирование" color="warning" />
                </S.Container>
            </BorderContainer>

            <BorderContainer>
                <S.Container>
                    <S.BoldTitle>Секретарь комитета</S.BoldTitle>

                    <HumanCard
                        avatar={human4}
                        secondName="Ерохин"
                        firstName="Александр Владимирович"
                        description="Директор по развитию платформенных решений. 
Блок по информационным технологиям"
                    />
                </S.Container>

                <S.Container>
                    <S.BoldTitle>Функции</S.BoldTitle>

                    <IconText icon="Notification" text="Проведение заседаний" color="info" />
                </S.Container>
            </BorderContainer>
        </S.PageWrapper>
    );
};
