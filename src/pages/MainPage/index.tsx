import React from 'react';

import { Header } from 'components/core';
import { Button, Slider } from 'components/interaction';

import * as SPages from 'pages/units';

import diagram1 from './images/diagram1.svg';
import diagram2 from './images/diagram2.svg';
import diagram3 from './images/diagram3.svg';
import diagram4 from './images/diagram4.svg';

import { InfoWithDiagram } from './components';
import * as S from './units';

// TODO: рефакторинг - раскидать по блокам/виджетам, использовать компоненты
export const MainPage = () => {
    return (
        <>
            <Header />

            <S.GeneralBlock>
                <S.Title>переиспользуйте существующие возможности</S.Title>

                <S.H3>
                    воспользуйтесь возможностями витрины на всех этапах производственного процесса
                    создания продукта
                </S.H3>

                <Button>Узнать подробнее</Button>
            </S.GeneralBlock>

            {/* из-за блока с картинкой убран верхний паддинг -- не подходит под все страницы */}
            <SPages.PageWrapper>
                <S.H1>из чего состоит витрина</S.H1>

                <Slider />

                {/* <S.CardsContainer>
                    <Card colorType="green" title="модели">
                        Функционально-доменная модель позволяет узнать о существующих в компании
                        возможностях, переиспользовать их, и заказать необходимую возможность
                        у вдалельца домена, а также получить информацию о состоянии ИТ–ландшафта.
                    </Card>

                    <Card colorType="pink" title="база знаний">
                        В базе знаний вы можете найти все документы для подготовки к архитектурному
                        комитету, организации производственного процесса, а также обратиться
                        за помощью, узнать опыт коллег
                    </Card>

                    <Card colorType="blue" title="личный кабинет">
                        С помощью личного кабинета отслеживайте стадии жизненного цикла
                        возможностей, храните документацию по проекту, работайте с техническим
                        долгом, погружайте команду, делитесь опытом
                    </Card>
                </S.CardsContainer> */}

                <S.H1>используя наш продукт</S.H1>

                <S.InfoContainer>
                    <InfoWithDiagram diagram={diagram1} titleFirst="60%" titleSecond="времени">
                        экономит команда продукта на создании артефактов
                    </InfoWithDiagram>

                    <InfoWithDiagram diagram={diagram2} titleFirst="на 30%" titleSecond="времени">
                        сокращается подготовка к защите на Архитектурном комитете
                    </InfoWithDiagram>

                    <InfoWithDiagram diagram={diagram3} titleFirst="50%" titleSecond="времени">
                        экономит сотрудник на поиске возможностей на ландшафте
                    </InfoWithDiagram>

                    <InfoWithDiagram diagram={diagram4} titleFirst="15+" titleSecond="команд">
                        использует витрину ФДМ
                    </InfoWithDiagram>
                </S.InfoContainer>

                <S.H1>у нас спрашивали</S.H1>

                <S.AccordionStyled />

                <S.CallbackWrapper>
                    <S.CallbackContainer>
                        <S.H1ForCallbackStyled>всегда на связи</S.H1ForCallbackStyled>

                        <S.Text>
                            Напишите нам, если у вас есть вопросы или предложения по улучшению
                            существующих материалов.
                        </S.Text>

                        <Button>Связаться с нами</Button>
                    </S.CallbackContainer>
                </S.CallbackWrapper>
            </SPages.PageWrapper>
        </>
    );
};
