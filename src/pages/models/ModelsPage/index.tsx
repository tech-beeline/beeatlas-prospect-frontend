import React from 'react';

import { CardVariant } from 'components/interaction';

import * as R from 'router/const';
import * as STYLES from 'styles/units';

import * as S from './units';

export const ModelsPage = () => {
    return (
        <S.PageWrapper className="PageWrapper">
            <S.ContentWrapper className="ContentWrapper">
                <STYLES.H2 className="H2">Модели</STYLES.H2>

                <S.CardContainer className="CardContainer">
                    <S.CardStyled
                        variant={CardVariant.TEAL}
                        title="Поиск возможностей в ФДМ"
                        to={`${R.MODELS_PATH}${R.SEARCH_PATH}`}
                    >
                        Полнотекстовый поиск бизнес и технических возможностей на ландшафте компании
                    </S.CardStyled>

                    <S.CardStyled
                        variant={CardVariant.MAGENTA}
                        title="ФДМ"
                        to={`${R.MODELS_PATH}${R.FDM_PATH}`}
                    >
                        Функционально-Доменная Модель — это модель бизнес-возможностей ИТ-ландшафта
                        ВК, разработанная для обеспечения простой и удобной навигации в пространстве
                        возможностей по функциональному признаку.
                    </S.CardStyled>

                    <S.CardStyled
                        variant={CardVariant.LEMON}
                        title="Технорадар"
                        to={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}`}
                    >
                        Диаграмма, на которой можно увидеть технологии и инструменты, которые
                        используются в компании
                    </S.CardStyled>

                    <S.CardStyled
                        variant={CardVariant.AQUAMARINE}
                        title="Карта возможностей"
                        to={`${R.MODELS_PATH}${R.MAP_PATH}`}
                    >
                        Это инструмент, который позволяет анализировать и контролировать состояние
                        возможностей в рамках функционально-доменной модели
                    </S.CardStyled>

                    <S.CardStyled
                        variant={CardVariant.PURPLE}
                        title="Каталог приложений"
                        to={`${R.MODELS_PATH}${R.APPS_PATH}`}
                    >
                        Содержит список приложений и дополнительную информацию о каждом приложении
                    </S.CardStyled>

                    {window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false && (
                        <S.CardStyled
                            variant={CardVariant.INFO}
                            title="E2E сценарии"
                            to={`${R.MODELS_PATH}${R.E2E_PATH}`}
                        >
                            Содержит список сценариев и подробную информацию о них, включая проверку
                            их описания
                        </S.CardStyled>
                    )}

                    <S.CardStyled
                        variant={CardVariant.ERROR}
                        title="Архитектура компании"
                        to={`${R.MODELS_PATH}${R.IMPACT_PATH}`}
                    >
                        Инструмент для оценки влияния сбойных элементов (приложений, экземпляров,
                        сервисов, серверов, эндпоинтов) на работу системы
                    </S.CardStyled>
                    <S.CardStyled
                        variant={CardVariant.WARNING}
                        title="Каталог паттернов"
                        to={`${R.MODELS_PATH}${R.PATTERNS_PATH}`}
                    >
                        Паттерны содержат эффективные решения типовых задач разработки, а раздел
                        антипаттернов помогает избежать типичных ошибок при создании качественных
                        продуктов
                    </S.CardStyled>
                    <S.CardStyled
                        variant={CardVariant.SUCCESS}
                        title="Аналитический отчет фитнес-функций"
                        to={`${R.MODELS_PATH}${R.ANALYTICAL_REPORT_PATH}`}
                    >
                        Это сводка автоматических проверок, которая показывает, насколько работа
                        приложения соответствует ожидаемым производственным стандартам
                    </S.CardStyled>
                    <S.CardStyled
                        variant={CardVariant.NEUTRAL}
                        title="Каталог жизненных ситуаций"
                        to={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}`}
                    >
                        Жизненная ситуация связывает проблему пользователя с готовыми решениями.
                        Каждая ситуация закрывается комбинацией паттернов — универсальных способов
                        действий, которые реализуются через конкретные требования — четкие шаги к
                        результату. Это обеспечивает переиспользование решений и прозрачный маршрут
                    </S.CardStyled>
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
