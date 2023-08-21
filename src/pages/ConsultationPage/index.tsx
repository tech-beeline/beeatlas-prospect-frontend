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
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Создание концепции продукта&body=Наименование продукта/сервиса/платформы:%0D%0AОписание продукта: Прикрепите ссылку на страницу с описанием продукта, включающее в себя суть продукта.%0D%0AЖелаемый результат от консультации: Напишите, какой артефакт вы ожидаете увидеть%0D%0AПрикрепите дополнительные материалы к письму, если это необходимо`)
                    }
                />

                <IconCard
                    icon="Edit"
                    color="warning"
                    title="Создание материалов для выхода на АК"
                    text="Консультирование/кураторство в создании презентации к АК"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Создание материалов для выхода на АК&body=Наименование продукта/сервиса/платформы:%0D%0AПрикрепите ссылку с описанием продукта/сервиса/платформы%0D%0AОписание архитектуры решения:%0D%0AОпишите существующие на ландшафте и решающих такие же задачи продукты с обоснованием целесообразности%0D%0AПрикрепите дополнительные материалы к письму, если это необходимо`)
                    }
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
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Использование рекомендуемых технологий&body=Наименование продукта, сервиса или платформы:%0D%0AОписание: Прикрепите ссылку на страницу с описанием продукта, включая требования и ограничения.%0D%0AОписание вариантов выбора технологии и/или инструмента:%0D%0AПрикрепите дополнительные материалы к письму, если это необходимо`)
                    }
                />

                <IconCard
                    icon="PagesMultiple"
                    color="purple"
                    title="Применение документа Техническая политика"
                    text="Консультация по применению документа, пояснения по тексту, результату"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Применение документа Техническая политика&body=Зафиксируйте описание решаемой задачи или вопросов, возникших при ознакомлении с документом.`)
                    }
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
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Первичное позиционирование&body=Наименование продукта/сервиса/платформы:%0D%0AОписание: Прикрепите ссылку на страницу с описанием продукта, включающее в себя суть продукта/сервиса/платформы%0D%0AНаличие моделей ИТ-продукта(решения) в SPARX EA – желательно%0D%0AПрикрепите дополнительные материалы к письму, если это необходимо`)
                    }
                />

                <IconCard
                    icon="Position"
                    color="error"
                    title="Верификация позиционирования"
                    text="Подтверждение полноты, непротиворечивости, корректности позиционирования техно-возможностей. В ряде случаев может быть так же необходим при подготовке к АК"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Верификация позиционирования&body=Наименование продукта/сервиса/платформы:%0D%0AОписание: Прикрепите ссылку на страницу с описанием продукта, включающее в себя суть продукта/сервиса/платформы%0D%0AНаличие моделей ИТ-продукта(решения) в SPARX EA – желательно%0D%0AПрикрепите дополнительные материалы к письму, если это необходимо`)
                    }
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
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Другое&body=Наименование продукта/сервиса/платформы:%0D%0AОписание продукта: Прикрепите ссылку на страницу с описанием продукта или опишите проблематику.%0D%0AЖелаемый результат от консультации: Напишите, какой артефакт вы ожидаете увидеть%0D%0AПрикрепите дополнительные материалы к письму, если это необходимо`)
                    }
                />

                <div style={{ width: '100%', padding: '24px' }}></div>
            </S.AdaptiveCardContainer>

            <S.H4Styled className="H4">Владелец сервиса</S.H4Styled>

            <STYLES.BoldText className="BoldText">Филатова Ольга Ивановна</STYLES.BoldText>

            <STYLES.GrayText className="GrayText">
                Руководитель проекта, Центр компетенции по проектному управлению,
                <br />
                Департамент разработки платформенных решений
            </STYLES.GrayText>

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
