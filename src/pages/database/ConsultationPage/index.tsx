import React from 'react';

import { TitleBack } from 'components/interaction';
import { IconCard } from 'components/other';

import * as STYLES from 'styles/units';

import * as S from './units';

export const ConsultationPage = () => {
    return (
        <S.PageWrapper className="PageWrapper">
            <TitleBack title="Консультирование" />

            <S.SubTitle className="SubTitle">
                Обратитесь за консультацией к корпоративным архитекторам по вопросам, связанным
                с подготовкой к защите на Архитектурном комитете, позиционировании продукта, выборе
                технологий, а также по любым другим вопросам, связанным с архитектурой ИТ-ландшафта
            </S.SubTitle>

            <S.H4 className="H4">Выберите нужное направление</S.H4>

            <S.AdaptiveCardContainer className="AdaptiveCardContainer">
                <IconCard
                    icon="Chat"
                    color="teal"
                    title="Создание концепции продукта"
                    text="Помощь команде при разработке концепции создания/развития ИТ-продукта, концепции решения сложной проблемы"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                />

                <IconCard
                    icon="Edit"
                    color="warning"
                    title="Создание материалов для выхода на АК"
                    text="Консультирование/кураторство в создании презентации к АК"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                />
            </S.AdaptiveCardContainer>

            <S.AdaptiveCardContainer className="AdaptiveCardContainer">
                <IconCard
                    icon="Building"
                    color="info"
                    title="Использование рекомендуемых технологий"
                    text="Определение рекомендуемых технологий для создания продукта"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                />

                <IconCard
                    icon="PagesMultiple"
                    color="purple"
                    title="Применение документа Техническая политика"
                    text="Консультация по применению документа, пояснения по тексту, результату"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                />
            </S.AdaptiveCardContainer>

            <S.AdaptiveCardContainer className="AdaptiveCardContainer">
                <IconCard
                    icon="Position"
                    color="success"
                    title="Первичное позиционирование"
                    text="Определение места позиционирования Техно-возможностей, определение ценности ИТ-продукта (сервиса) для ИТ-ландшафта и/или потребителей"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                />

                <IconCard
                    icon="Position"
                    color="error"
                    title="Верификация позиционирования"
                    text="Подтверждение полноты, непротиворечивости, корректности позиционирования техно-возможностей. В ряде случаев может быть так же необходим при подготовке к АК"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                />
            </S.AdaptiveCardContainer>

            <S.AdaptiveCardContainer className="AdaptiveCardContainer">
                <IconCard
                    icon="QuestionCircled"
                    color="magenta"
                    title="Другое"
                    text="Если запрос не подпадает ни под одно из направлений"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                />

                <div style={{ width: '100%', padding: '24px' }}></div>
            </S.AdaptiveCardContainer>

            <S.H4Styled className="H4">Владелец сервиса</S.H4Styled>

            <STYLES.GrayText className="GrayText">
                Руководитель проекта, Центр компетенции по проектному управлению,
                <br />
                Департамент разработки платформенных решений
            </STYLES.GrayText>
        </S.PageWrapper>
    );
};
