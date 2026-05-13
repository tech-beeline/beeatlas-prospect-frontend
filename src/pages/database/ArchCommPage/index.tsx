import React from 'react';

import { BorderContainer } from 'components/containers';
import { IconText } from 'components/other';

import * as R from 'router/const';
import * as STYLES from 'styles/units';

import human1 from './images/human1.jpg';
import human3 from './images/human3.jpg';
import human4 from './images/human4.jpg';
import { HumanCard } from './HumanCard';
import * as S from './units';

export const ArchCommPage = () => {
    return (
        <S.PageWrapper className="PageWrapper">
            <S.H3 className="H3">Архитектурный комитет</S.H3>

            <S.GrayTextStyled className="GrayText">
                — коллегиальный орган, состоящий из вице-президентов компании и корпоративных
                архитекторов.
            </S.GrayTextStyled>

            <S.H4Styled className="H4">Для чего был создан</S.H4Styled>

            <S.List>
                <STYLES.GrayText className="GrayText">
                    <li>обеспечить гибкость и консистентность ИТ-ландшафта</li>
                </STYLES.GrayText>

                <STYLES.GrayText className="GrayText">
                    <li>ускорить time-to-market новых возможностей на уровне компании</li>
                </STYLES.GrayText>

                <STYLES.GrayText className="GrayText">
                    <li>обеспечить баланс между стоимостью разработки и гибкостью решения</li>
                </STYLES.GrayText>

                <STYLES.GrayText className="GrayText">
                    <li>улучшить возможности масштабирования, нагрузки, безопасности</li>
                </STYLES.GrayText>

                <STYLES.GrayText className="GrayText">
                    <li>обеспечить переиспользование знаний и технологий в компании</li>
                </STYLES.GrayText>
            </S.List>

            <S.H4mb40Styled className="H4">Состав и функции Архитектурного комитета</S.H4mb40Styled>

            <S.BorderContainerStyled>
                <S.Container className="Container">
                    <STYLES.H5 className="BoldTitle">Лица, принимающие решения</STYLES.H5>

                    <HumanCard
                        avatar={human1}
                        secondName="Рубенчик"
                        firstName="Антон Владимирович"
                        description="Вице-президент по информационным технологиям. 
Блок по информационным технологиям"
                    />

                    <HumanCard
                        avatar={human3}
                        secondName="Шоржин"
                        firstName="Валерий Викторович"
                        description="Исполнительный вице-президент по технике. 
Технический блок"
                    />
                </S.Container>

                <S.Container className="Container">
                    <STYLES.H5 className="BoldTitle">Функции</STYLES.H5>

                    <IconText icon="Notification" text="Принятие решений" color="info" />
                    <IconText icon="Suitcase" text="Развитие ИТ-ландшафта" color="warning" />
                    <IconText icon="Flash" text="Разрешение конфликтов" color="error" />
                    <IconText icon="PagesMultipleAdd" text="Инициация проектов" color="magenta" />
                    <IconText icon="PageSearch" text="Утверждение техполитики" color="purple" />
                </S.Container>
            </S.BorderContainerStyled>

            <S.BorderContainerStyled>
                <S.Container className="Container">
                    <STYLES.H5 className="BoldTitle">
                        Центр развития корпоративной архитектуры
                    </STYLES.H5>

                    <S.HumanCardStyled firstName="Руководитель центра" />

                    <S.HumanCardStyled avatar="group" firstName="Корпоративные архитекторы" />
                </S.Container>

                <S.Container className="Container">
                    <STYLES.H5 className="BoldTitle">Функции</STYLES.H5>

                    <IconText
                        icon="UserVerified"
                        text="Оппонирование"
                        color="success"
                        to={`${R.DATA_BASE_PATH}${R.SERVICES_PATH}`}
                    />

                    <IconText
                        icon="QuestionCircled"
                        text="Консультирование"
                        color="teal"
                        to={`${R.DATA_BASE_PATH}${R.SERVICES_PATH}${R.CONSULTATION_PATH}`}
                    />
                </S.Container>
            </S.BorderContainerStyled>

            <BorderContainer>
                <S.Container className="Container">
                    <STYLES.H5 className="BoldTitle">Секретарь комитета</STYLES.H5>

                    <HumanCard
                        avatar={human4}
                        secondName="Ерохин"
                        firstName="Александр Владимирович"
                        description="Директор по развитию платформенных решений. 
Блок по информационным технологиям"
                    />
                </S.Container>

                <S.Container className="Container">
                    <STYLES.H5 className="BoldTitle">Функции</STYLES.H5>

                    <IconText icon="Megaphone" text="Проведение заседаний" />
                </S.Container>
            </BorderContainer>
        </S.PageWrapper>
    );
};
