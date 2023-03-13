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
                    title="Создание концепции продукта (400 кир)"
                    text="Помощь команде при разработкеконцепции создания/развития ИТ-продукта, концепции решения сложной проблемы"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=%D2%E5%EC%E0%20%EF%E8%F1%FC%EC%E0&body=Медленно, но верно. Осмысленный подход к принятию решений способствует достижению успеха. Внимательно анализируйте каждую ситуацию и делайте обдуманные выводы. Не спешите с принятием решений, но и не откладывайте их на потом. Сосредоточьтесь на цели и действуйте последовательно. Только так можно добиться успеха в любой области жизни. Помните, что терпение и настойчивость являются важными качествам`)
                    }
                />

                <IconCard
                    icon="Edit"
                    color="warning"
                    title="Создание материалов для выхода на АК (300 кир)"
                    text="Консультирование/кураторство в создании презентации к АК"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Создание материалов для выхода на АК&body=Медленно, но верно. Осмысленный подход к принятию решений способствует достижению успеха. Внимательно анализируйте каждую ситуацию и делайте обдуманные выводы. Не спешите с принятием решений, но и не откладывайте их на потом. Сосредоточьтесь на цели и действуйте последовательно. Только так можнннннн`)
                    }
                />
            </S.AdaptiveCardContainer>

            <S.AdaptiveCardContainer className="AdaptiveCardContainer">
                <IconCard
                    icon="Building"
                    color="info"
                    title="Использование рекомендуемых технологий (200 кир)"
                    text="Определение рекомендуемых технологий для создания продукта"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Использование рекомендуемых технологий&body=Медленно, но верно. Осмысленный подход к принятию решений способствует достижению успеха. Внимательно анализируйте каждую ситуацию и делайте обдуманные выводы. Не спешите с принятием решений, но и иии`)
                    }
                />

                <IconCard
                    icon="PagesMultiple"
                    color="purple"
                    title="Применение документа Техническая политика (920)"
                    text="Консультация по применению документа, пояснения по тексту, результату"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Применение документа Техническая политика&body=Работайте усердно и с умом, и успех не заставит себя долго ждать. В жизни нет ничего невозможного, если вы настойчиво идете к своей цели. Не бойтесь неудач, их можно использовать как уроки на пути к успеху. Помните, что каждая проблема имеет решение, и каждое препятствие можно преодолеть. Не забывайте наслаждаться каждым моментом жизни, ибо она прекрасна и коротка. Доверяйте своим мечтам и стремитесь к ним, и вы обязательно их достигнете! Лучше сделать и пожалеть, чем не сделать и всю жизнь жалеть. Жизнь коротка, и каждый миг на ней должен быть заполнен яркими событиями. Не бойтесь рисковать и не отказывайтесь от возможностей, которые даются вам судьбой. Не стоит ждать чуда – лучше самому его создать. Уважайте себя и свои желания, иначе никто не будет уважать вас. Доверьтесь своей интуиции и не бойтесь ошибаться, ибо ошибки делают нас сильнее. Не забывайте наслаждаться жизнью, и она ответит вам взаимностью!`)
                    }
                />
            </S.AdaptiveCardContainer>

            <S.AdaptiveCardContainer className="AdaptiveCardContainer">
                <IconCard
                    icon="Position"
                    color="success"
                    title="Первичное позиционирование (662)"
                    text="Определение места позиционирования Техно-возможностей, определение ценности ИТ-продукта (сервиса) для ИТ-ландшафта и/или потребителей"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Первичное позиционирование&body=Работайте усердно и с умом, и успех не заставит себя долго ждать. В жизни нет ничего невозможного, если вы настойчиво идете к своей цели. Не бойтесь неудач, их можно использовать как уроки на пути к успеху. Помните, что каждая проблема имеет решение, и каждое препятствие можно преодолеть. Не забывайте наслаждаться каждым моментом жизни, ибо она прекрасна и коротка. Доверяйте своим мечтам и стремитесь к ним, и вы обязательно их достигнете! Лучше сделать и пожалеть, чем не сделать и всю жизнь жалеть. Жизнь коротка, и каждый миг на ней должен быть заполнен яркими событиями. Не бойтесь рисковать и не отказывайтесь от возможностей, которые даются вам судьбой.`)
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
