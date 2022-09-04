import React from 'react';
import { Button } from '@beeline/lk-ui';
import { observer } from 'mobx-react';

import { Header } from 'components/core';
import { Slider } from 'components/interaction';

import * as SPages from 'pages/units';

// import { useRootStore } from 'stores/initStore';
import diagram1 from './images/diagram1.svg';
import diagram2 from './images/diagram2.svg';
import diagram3 from './images/diagram3.svg';
import diagram4 from './images/diagram4.svg';

import { InfoWithDiagram } from './components';
import * as S from './units';

// TODO: рефакторинг - раскидать по блокам/виджетам, использовать компоненты
export const MainPage = observer(() => {
    // const {
    //     generalStore: { themeIsDark },
    // } = useRootStore();

    // console.log(themeIsDark);

    return (
        // TODO: вынести в общее
        <S.PageWrapper>
            <Header />

            <S.GeneralBlock>
                {/* <Icon iconName={Icons.Alarm} /> */}

                <S.Title>переиспользуйте существующие возможности</S.Title>

                <S.H3>
                    воспользуйтесь возможностями витрины на всех этапах производственного процесса
                    создания продукта
                </S.H3>

                <Button variant="contained" size="medium">
                    Узнать подробнее
                </Button>
            </S.GeneralBlock>

            {/* из-за блока с картинкой убран верхний паддинг -- не подходит под все страницы */}
            <SPages.PageWrapper>
                <S.H1>из чего состоит витрина</S.H1>

                <Slider />

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

                        <Button variant="contained" size="medium">
                            Связаться с нами
                        </Button>
                    </S.CallbackContainer>
                </S.CallbackWrapper>
            </SPages.PageWrapper>
        </S.PageWrapper>
    );
});
