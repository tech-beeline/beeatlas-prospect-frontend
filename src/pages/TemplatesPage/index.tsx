import React from 'react';

// import { Link as LinkRR } from 'react-router-dom';
import { Link } from 'components/interaction';
import { IconCard } from 'components/other';

import * as ROUTER from 'router/const';

// import { downloadFile } from 'utils/downloadFile';
// @ts-ignore
// import fileFirst from './files/file_AK.pptx';
import * as S from './units';

export const TemplatesPage = () => {
    return (
        <S.PageWrapper>
            <S.H3>Шаблоны материалов</S.H3>

            <S.H4 style={{ marginBottom: '32px' }}>Выходите на защиту впервые</S.H4>

            <IconCard
                icon="Chat"
                color="teal"
                title="Концепция продукта"
                text="Презентация идеи создания или развития ИТ-продукта или решения сложной проблемы (сложного коммунального элемента)"
                // onClick={() => downloadFile(fileFirst)}
            />

            {/* <LinkRR to="./file_AK.pptx" target="_blank" download>
                Download
            </LinkRR> */}
            {/* <a href="./files/file_AK.pptx" download>
                Download
            </a> */}

            {/* <S.H4 style={{ marginTop: '40px' }}>Повторный выход на защиту</S.H4>
            <S.SmallText>или защита части концепции (например, если продукт не новый)</S.SmallText>

            <S.AdaptiveCardContainer>
                <IconCard
                    icon="Position"
                    color="warning"
                    title="Позиционирование"
                    text="Разработка позиционирования (формирование собственного сегмента) своего продукта в компании"
                />

                <IconCard
                    icon="StatUp"
                    color="purple"
                    title="Целевая архитектура"
                    text="Презентация нового решения по развитию (доработка, создание, переиспользование) целевой архитектуры"
                />
            </S.AdaptiveCardContainer>

            <S.AdaptiveCardContainer>
                <IconCard
                    icon="Hourglass"
                    color="success"
                    title="Временное решение"
                    text="Защита временного решения, которое необходимо использовать до выхода целевого"
                />

                <IconCard
                    icon="NetworkAlt"
                    color="info"
                    title="Модель данных"
                    text="Защита материалав по развитию (доработка, создание, переиспользование) существующей модели данных"
                />
            </S.AdaptiveCardContainer>

            <S.AdaptiveCardContainer>
                <IconCard
                    icon="Star"
                    color="magenta"
                    title="Использование новой технологии"
                    text="Презентация нового решения по использованию новой(-ых) технологии(-ий)"
                />
            </S.AdaptiveCardContainer> */}

            <S.H4 style={{ marginTop: '54px' }}>Не нашли подходящий шаблон?</S.H4>
            <S.SmallText>
                Обратитесь за&nbsp;
                <Link
                    path={`${ROUTER.DATA_BASE_PATH}${ROUTER.ARCH_COMM_PATH}${ROUTER.ARCH_HOW_TO_PATH}`}
                    fontSize={19}
                    isInner
                >
                    консультацией
                </Link>
            </S.SmallText>
        </S.PageWrapper>
    );
};
