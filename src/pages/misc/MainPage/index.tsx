import React, { useRef } from 'react';

import { Slider } from 'components/interaction';
import { Button } from 'components/ui';

import * as SPages from 'pages/units';
import * as STYLES from 'styles/units';

import diagram1 from './images/diagram1.svg';
import diagram2 from './images/diagram2.svg';
import diagram3 from './images/diagram3.svg';
import diagram4 from './images/diagram4.svg';

import { InfoWithDiagram } from './components';
import * as S from './units';

export const MainPage = () => {
    const refH1 = useRef(null);

    return (
        <>
            {/* // TODO: вынести в общее */}
            <S.PageWrapper className="PageWrapper">
                <S.GeneralBlock className="GeneralBlock">
                    {/* <Icon iconName={Icons.Alarm} /> */}

                    <S.Title className="Title">переиспользуйте существующие возможности</S.Title>

                    <S.H3 className="H3">
                        воспользуйтесь возможностями витрины на всех этапах производственного
                        процесса создания продукта
                    </S.H3>

                    <Button
                        variant="contained"
                        size="medium"
                        ref={refH1}
                        // @ts-ignore
                        onClick={() => refH1.current?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Узнать подробнее
                    </Button>
                </S.GeneralBlock>

                {/* из-за блока с картинкой убран верхний паддинг -- не подходит под все страницы */}
                <SPages.PageWrapper className="SPageWrapper">
                    <STYLES.H1 className="H1">из чего состоит витрина</STYLES.H1>

                    <Slider />

                    <STYLES.H1 className="H1">используя наш продукт</STYLES.H1>

                    <S.InfoContainer className="InfoContainer">
                        <InfoWithDiagram diagram={diagram1} titleFirst="60%" titleSecond="времени">
                            экономит команда продукта на создании артефактов
                        </InfoWithDiagram>

                        <InfoWithDiagram
                            diagram={diagram2}
                            titleFirst="на 30%"
                            titleSecond="времени"
                        >
                            сокращается подготовка к защите на Архитектурном комитете
                        </InfoWithDiagram>

                        <InfoWithDiagram diagram={diagram3} titleFirst="50%" titleSecond="времени">
                            экономит сотрудник на поиске возможностей на ландшафте
                        </InfoWithDiagram>

                        <InfoWithDiagram diagram={diagram4} titleFirst="15+" titleSecond="команд">
                            использует витрину ФДМ
                        </InfoWithDiagram>
                    </S.InfoContainer>

                    <STYLES.H1 className="H1">у нас спрашивали</STYLES.H1>

                    <S.AccordionStyled />

                    <S.CallbackWrapper className="CallbackWrapper">
                        <S.CallbackContainer className="CallbackContainer">
                            <S.H1ForCallbackStyled className="H1ForCallbackStyled">
                                всегда на связи
                            </S.H1ForCallbackStyled>

                            <S.Text className="Text">
                                Напишите нам, если у вас есть вопросы или предложения по улучшению
                                существующих материалов.
                            </S.Text>

                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() =>
                                    (window.location.href =
                                        'mailto:OlIFilatova@beeline.ru?subject=Вопросы по работе с витриной')
                                }
                            >
                                Связаться с нами
                            </Button>
                        </S.CallbackContainer>
                    </S.CallbackWrapper>
                </SPages.PageWrapper>
            </S.PageWrapper>
        </>
    );
};
