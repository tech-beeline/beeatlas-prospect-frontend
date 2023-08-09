import React from 'react';

import { BorderContainer } from 'components/containers';
import { IconText } from 'components/other';

import * as ROUTER from 'router/const';
import * as STYLES from 'styles/units';

// import human5 from './images/human5.png';
import human1 from './images/human1.jpg';
// import human2 from './images/human2.jpg';
import human3 from './images/human3.jpg';
import human4 from './images/human4.jpg';
import { HumanCard } from './HumanCard';
import * as S from './units';

export const ArchCommPage = () => {
    return (
        <S.PageWrapper className="PageWrapper">
            <S.H3 className="H3">Архитектурный комитет</S.H3>

            <STYLES.GrayText className="GrayText" style={{ marginBottom: '32px' }}>
                — коллегиальный орган, состоящий из вице-президентов компании и корпоративных
                архитекторов.
            </STYLES.GrayText>

            <STYLES.H4 className="H4" style={{ marginBottom: '12px' }}>
                Для чего был создан
            </STYLES.H4>
            <ul style={{ marginBottom: '50px' }}>
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
            </ul>

            <STYLES.H4 className="H4" style={{ marginBottom: '40px' }}>
                Состав и функции Архитектурного комитета
            </STYLES.H4>

            <BorderContainer style={{ marginBottom: '24px' }}>
                <S.Container className="Container">
                    <STYLES.H5 className="BoldTitle">Лица принимающие решения</STYLES.H5>

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

                    {/* <HumanCard
                        avatar={human5}
                        secondName="Евдокимов"
                        firstName="Андрей Александрович"
                        description="Вице-президент по безопасности"
                    /> */}
                </S.Container>

                <S.Container className="Container">
                    <STYLES.H5 className="BoldTitle">Функции</STYLES.H5>

                    <IconText icon="Notification" text="Принятие решений" color="info" />
                    <IconText icon="Suitcase" text="Развитие ИТ-ландшафта" color="warning" />
                    <IconText icon="Flash" text="Разрешение конфликтов" color="error" />
                    <IconText icon="PagesMultipleAdd" text="Инициация проектов" color="magenta" />
                    <IconText icon="PageSearch" text="Утверждение техполитики" color="purple" />
                </S.Container>
            </BorderContainer>

            <BorderContainer style={{ marginBottom: '24px' }}>
                <S.Container className="Container">
                    <STYLES.H5 className="BoldTitle">
                        Центр развития корпоративной архитектуры
                    </STYLES.H5>

                    <HumanCard
                        firstName="Руководитель центра"
                        //                         description="Вице-президент по информационным технологиям.
                        // Блок по информационным технологиям"
                        style={{ gap: '0' }}
                    />

                    <HumanCard
                        avatar="group"
                        firstName="Корпоративные архитекторы"
                        //                         description="Вице-президент по работе с данными.
                        // Блок по работе с данными"
                        style={{ gap: '0' }}
                    />
                </S.Container>

                <S.Container className="Container">
                    <STYLES.H5 className="BoldTitle">Функции</STYLES.H5>

                    <IconText
                        icon="UserVerified"
                        text="Оппонирование"
                        color="success"
                        to={`${ROUTER.DATA_BASE_PATH}${ROUTER.SERVICES_PATH}`}
                    />
                    <IconText
                        icon="QuestionCircled"
                        text="Консультирование"
                        color="teal"
                        to={`${ROUTER.DATA_BASE_PATH}${ROUTER.SERVICES_PATH}${ROUTER.CONSULTATION_PATH}`}
                    />
                </S.Container>
            </BorderContainer>

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
