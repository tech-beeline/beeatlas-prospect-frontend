import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Icons } from '@beeline/lk-ui';

import { IconCard } from 'components/other';

import * as S from './units';

export const ConsultationPage = () => {
    const navigate = useNavigate();

    return (
        <S.PageWrapper>
            <S.H3 onClick={() => navigate(-1)}>
                <Icon iconName={Icons.ArrowLeft} /> Консультирование
            </S.H3>

            <S.SubTitle>
                Обратитесь за консультацией к корпоративным архитекторам по вопросам, связанным
                с подготовкой к защите на Архитектурном комитете, позиционировании продукта, выборе
                технологий, а также по любым другим вопросам, связанным с архитектурой ИТ-ландшафта
            </S.SubTitle>

            <S.H4>Выберите нужное направление</S.H4>

            <S.AdaptiveCardContainer>
                <IconCard
                    icon="Chat"
                    color="teal"
                    title="Создание концепции продукта"
                    text="Помощь команде при разработкеконцепции создания/развития ИТ-продукта, концепции решения сложной проблемы"
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

            <S.AdaptiveCardContainer>
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

            <S.AdaptiveCardContainer>
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

            <S.AdaptiveCardContainer>
                <IconCard
                    icon="QuestionCircled"
                    color="magenta"
                    title="Другое"
                    text="Если запрос не подпадает ни под одно из направлений"
                    deadlineText="3 рабочих дня"
                    buttonText="Обратиться"
                />
            </S.AdaptiveCardContainer>

            <S.H4 style={{ margin: '56px 0 26px' }}>Владелец сервиса</S.H4>
            <S.BoldText>Филатова Ольга Ивановна</S.BoldText>

            <S.GrayText>
                Руководитель центра компетенции по дизайну и пользовательским интерфейсам
                <br />
                Центр компетенции по дизайну и пользовательским интерфейсам
            </S.GrayText>

            <S.FlexBottomContainer>
                <S.GraySecondText>
                    Email:{' '}
                    <S.EmailLink href="mailto: email@beeline.ru">email@beeline.ru</S.EmailLink>
                </S.GraySecondText>

                <S.GraySecondText>Телефон: +7 900 650-75-55</S.GraySecondText>
            </S.FlexBottomContainer>
        </S.PageWrapper>
    );
};
