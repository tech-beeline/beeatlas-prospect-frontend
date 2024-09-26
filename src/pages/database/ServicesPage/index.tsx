import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as C from 'router/const';

import { ServiceCard } from './ServiceCard';
import * as S from './units';

export const ServicesPage = () => {
    const navigate = useNavigate();

    return (
        <S.PageWrapper className="PageWrapper">
            <S.H3 className="H3">Сервисные услуги корпоративной архитектуры</S.H3>

            <S.FlexContainer className="FlexContainer">
                <ServiceCard
                    title="Консультирование"
                    text="Обратитесь за консультацией к корпоративным архитекторам по вопросам, связанным с подготовкой к защите на Архитектурном комитете, позиционировании продукта, выборе технологий, а также по любым другим вопросам, связанным с архитектурой ИТ-ландшафта"
                    ownerName="Филатова О.И."
                    buttonText="Выбрать направление"
                    onClick={() =>
                        navigate(`${C.DATA_BASE_PATH}${C.SERVICES_PATH}${C.CONSULTATION_PATH}`)
                    }
                />

                <ServiceCard
                    title="Подготовка оппонирующей позиции"
                    text={`Подготовка оппонирующей позиции при вынесении материалов на Архитектурный комитет. Это необходимо, чтобы убедиться, что возможности ИТ-ландшафта будут использоваться оптимально. Оппонирующую позицию составляет архитектор, опираясь на принципы технической политики. Обязательный этап при прохождении АК.
                    У вас должна быть готова презентация решения`}
                    ownerName="Филатова О.И."
                    buttonText="Заказать"
                    onClick={() =>
                        (window.location.href = `mailto:OlIFilatova@beeline.ru?subject=Подготовка оппонирующей позиции при вынесении материалов на АК&body=Добрый день!%0D%0A%0D%0A● Опишите кратко тему и материал, с которым вы хотите выйти на защиту.%0D%0A● Приложите материалы необходимые для подготовки оппонирующей позиции - итоговую версию презентации.%0D%0A%0D%0AСрок выполнения обращения - 10 рабочих дней.`)
                    }
                />
            </S.FlexContainer>
        </S.PageWrapper>
    );
};
