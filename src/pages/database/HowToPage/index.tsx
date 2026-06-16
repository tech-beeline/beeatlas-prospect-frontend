import React from 'react';

import { IconText, Link } from 'components/other';

import * as R from 'router/const';
import * as STYLES from 'styles/units';

import * as S from './units';

export const HowToPage = () => {
    return (
        <S.PageWrapper className="PageWrapper">
            <S.H3 className="H3">
                Как подготовиться
                <br />к защите на архитектурном комитете
            </S.H3>

            <S.SubTitle className="SubTitle">
                Продукт, который был защищен на АК, имеет свое место в ИТ-ландшафте компании.
            </S.SubTitle>

            <S.IconTextStyled
                number={1}
                text="Изучите материалы для выхода на архитектурный комитет"
                color="info"
            />

            <STYLES.GrayText className="GrayText" style={{ marginBottom: '40px' }}>
                Чтобы подготовка заняла минимум времени и сил, изучите алгоритм подготовки к выходу
                на защиту.
                <br />
                Если вопросы ещё остались, можно изучить опыт коллег, а также обратиться за 
                <Link
                    outer={false}
                    title="консультацией."
                    url={`${R.DATA_BASE_PATH}${R.SERVICES_PATH}${R.CONSULTATION_PATH}`}
                />
            </STYLES.GrayText>

            <S.IconTextStyled number={2} text="Подготовьте презентацию" color="info" />

            <STYLES.GrayText className="GrayText" style={{ marginBottom: '40px' }}>
                Архитектурный комитет рассматривает разные вопросы, например, по определению контура
                ответственности продукта, о применении новой технологии, о внесении изменения
                в модель данных, о способе построения архитектуры продукта, об изменении процесса
                производства и поставки продукта.
                <br />
                <br />
                В зависимости от вопроса, который вам необходимо решить на заседании, нужно
                использовать подходящий{' '}
                <Link
                    outer={false}
                    title="шаблон"
                    url={`${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}${R.ARCH_TEMPLATES_PATH}`}
                />{' '}
                для составления презентации. Убедитесь, что ваша концепция/продукт соответствует
                всем{' '}
                <Link
                    outer={false}
                    title="принципам Технической политики."
                    url={`${R.DATA_BASE_PATH}${R.TECH_POLICY_PATH}`}
                />
            </STYLES.GrayText>

            <S.IconTextStyled
                number={3}
                text="Закажите услугу по составлению оппонирующей позиции"
                color="info"
            />

            <STYLES.GrayText className="GrayText" style={{ marginBottom: '40px' }}>
                Воспользуйтесь сервисом{' '}
                <Link
                    title="заказа услуги"
                    url={`${R.DATA_BASE_PATH}${R.SERVICES_PATH}`}
                    outer={false}
                />{' '}
                по составлению оппонирующей позиции.
                <br />
                Этот шаг обязателен.
            </STYLES.GrayText>

            <S.BorderContainerStyled>
                <STYLES.H5 className="BoldTitle">После заказа услуги:</STYLES.H5>

                <IconText
                    icon="User"
                    text="Корпоративный архитектор составит Оппонирующую позицию, это позволит убедиться, что возможности ИТ-ландшафта будут использоваться оптимально."
                    color="purple"
                    isSecondary
                />

                <IconText
                    icon="Group"
                    text={`Во время подготовки оппонирующей позиции пройдет этап экспертного ревью. 
Эспертное ревью — это предварительная экспертная оценка. Во время ревью приглашенные эксперты дают общую оценку решения, свои замечания и рекомендации. В рамках экспертной оценки проводится позиционирование решения в функционально-доменной модели (ФДМ) и согласование изменений в корпоративной модели данных (КМД). 
Результаты экспертной оценки будут приложены к проекту решения при выходе на защиту корпоративным архитектором.`}
                    color="purple"
                    isSecondary
                />

                <IconText
                    icon="UserVerified"
                    text="После того, как оппонирующая позиция будет составлена, вам назначат дату и время заседания Архитектурного комитета.
После окончания заседания в разделе появятся материалы — протокол и запись встречи. Предварительные материалы можно посмотреть в Календаре заседаний"
                    color="purple"
                    isSecondary
                />
            </S.BorderContainerStyled>

            <IconText
                number={4}
                text="Подключитесь к заседанию"
                color="info"
                style={{ margin: '40px 0 12px' }}
            />
            <STYLES.GrayText className="GrayText">
                На заседании комиссия рассмотрит ваш запрос и даст резолюцию. На выступление у вас
                будет 15 минут (по 1 минуте на слайд). После защиты — блок ответов на вопросы.
                Результатом встречи является протокол заседания.
            </STYLES.GrayText>
        </S.PageWrapper>
    );
};
