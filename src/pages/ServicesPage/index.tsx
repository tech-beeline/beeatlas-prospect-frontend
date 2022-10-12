import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as C from 'router/const';

import { ServiceCard } from './ServiceCard';
import * as S from './units';

export const ServicesPage = () => {
    const navigate = useNavigate();

    return (
        <S.PageWrapper>
            <S.H3>Сервисные услуги корпоративной архитектуры</S.H3>

            <S.FlexContainer>
                <ServiceCard
                    title="Консультирование"
                    text="Обратитесь за консультацией к корпоративным архитекторам по вопросам, связанным с подготовкой к защите на Архитектурном комитете, позиционировании продукта, выборе технологий, а также по любым другим вопросам, связанным с архитектурой ИТ-ландшафта"
                    ownerName="Филатова О.И."
                    buttonText="Выбрать направление"
                    onClick={() => navigate(`${C.SERVICES_PATH}${C.CONSULTATION_PATH}`)}
                />

                <ServiceCard
                    title="Подготовка оппонирующей позиции"
                    text={`Подготовка оппонирующей позиции при вынесении материалов на Архитектурный комитет. Это необходимо, чтобы убедиться, что возможности ИТ-ландшафта будут использоваться оптимально. Оппонирующую позицию составляет архитектор, опираясь на принципы технической политики. Обязательный этап при прохождении АК.
                    У вас должна быть готова презентация решения.`}
                    ownerName="Филатова О.И."
                    buttonText="Заказать"
                />
            </S.FlexContainer>
        </S.PageWrapper>
    );
};
