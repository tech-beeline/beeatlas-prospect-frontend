import React from 'react';

import { TitleBack } from 'components/interaction';
import { IconCard } from 'components/other';

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
                    title="Создание концепции продукта (200)"
                    text="Помощь команде при разработкеконцепции создания/развития ИТ-продукта, концепции решения сложной проблемы"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=%D2%E5%EC%E0%20%EF%E8%F1%FC%EC%E0&body=texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext`)
                    }
                />

                <IconCard
                    icon="Edit"
                    color="warning"
                    title="Создание материалов для выхода на АК (249)"
                    text="Консультирование/кураторство в создании презентации к АК"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Создание материалов для выхода на АК&body=texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextt`)
                    }
                />
            </S.AdaptiveCardContainer>

            <S.AdaptiveCardContainer className="AdaptiveCardContainer">
                <IconCard
                    icon="Building"
                    color="info"
                    title="Использование рекомендуемых технологий (299)"
                    text="Определение рекомендуемых технологий для создания продукта"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Использование рекомендуемых технологий&body=texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttex`)
                    }
                />

                <IconCard
                    icon="PagesMultiple"
                    color="purple"
                    title="Применение документа Техническая политика (349)"
                    text="Консультация по применению документа, пояснения по тексту, результату"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Применение документа Техническая политика&body=texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextt`)
                    }
                />
            </S.AdaptiveCardContainer>

            <S.AdaptiveCardContainer className="AdaptiveCardContainer">
                <IconCard
                    icon="Position"
                    color="success"
                    title="Первичное позиционирование (399)"
                    text="Определение места позиционирования Техно-возможностей, определение ценности ИТ-продукта (сервиса) для ИТ-ландшафта и/или потребителей"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Первичное позиционирование&body=texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttex`)
                    }
                />

                <IconCard
                    icon="Position"
                    color="error"
                    title="Верификация позиционирования (449)"
                    text="Подтверждение полноты, непротиворечивости, корректности позиционирования техно-возможностей. В ряде случаев может быть так же необходим при подготовке к АК"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Верификация позиционирования&body=texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttextexttexttexttex`)
                    }
                />
            </S.AdaptiveCardContainer>

            <S.AdaptiveCardContainer className="AdaptiveCardContainer">
                <IconCard
                    icon="QuestionCircled"
                    color="magenta"
                    title="Другое (600)"
                    text="Если запрос не подпадает ни под одно из направлений"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Другое&body=texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttextexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttex`)
                    }
                />
            </S.AdaptiveCardContainer>

            <S.H4 className="H4" style={{ margin: '56px 0 26px' }}>
                Владелец сервиса
            </S.H4>
            <S.BoldText className="BoldText">Филатова Ольга Ивановна</S.BoldText>

            <S.GrayText className="GrayText">
                Руководитель проекта, Центр компетенции по проектному управлению,
                <br />
                Департамент разработки платформенных решений
            </S.GrayText>

            <S.FlexBottomContainer className="FlexBottomContainer">
                <S.GraySecondText className="GraySecondText">
                    Email:{' '}
                    <S.EmailLink className="EmailLink" href="mailto: OlIFilatova@beeline.ru">
                        OlIFilatova@beeline.ru
                    </S.EmailLink>
                </S.GraySecondText>

                <S.GraySecondText className="GraySecondText">
                    Телефон: +7 968 762-68-13
                </S.GraySecondText>
            </S.FlexBottomContainer>
        </S.PageWrapper>
    );
};
