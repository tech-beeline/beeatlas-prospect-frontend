import React, { useState } from 'react';

import { PivotArrow } from 'components/other';

import * as ROUTER from 'router/const';

import { Link } from '..';

import * as S from './units';

// вынести в const
const TextBlock1 = () => {
    return (
        <S.TextBlock className="TextBlock">
            Мы подготовили для вас{' '}
            <Link
                path={`${ROUTER.DATA_BASE_PATH}${ROUTER.ARCH_COMM_PATH}${ROUTER.ARCH_HOW_TO_PATH}`}
                fontSize={19}
                isInner
            >
                инструкцию по выходу на АК,
            </Link>{' '}
            <Link
                path={`${ROUTER.DATA_BASE_PATH}${ROUTER.ARCH_COMM_PATH}${ROUTER.ARCH_TEMPLATES_PATH}`}
                fontSize={19}
                isInner
            >
                шаблоны и чеклисты для материалов,
            </Link>{' '}
            требуемых на Архитектурном комитете. А еще можно{' '}
            <Link
                path={`${ROUTER.DATA_BASE_PATH}${ROUTER.SERVICES_PATH}${ROUTER.CONSULTATION_PATH}`}
                fontSize={19}
                isInner
            >
                проконсультироваться
            </Link>{' '}
            у корпоративного архитектора по вопросам подготовки концепции, позиционирования и другим
            вопросам в рамках сервиса Корпоративной архитектуры.
        </S.TextBlock>
    );
};

const TextBlock2 = () => {
    return (
        <S.TextBlock className="TextBlock">
            На этот вопрос дает ответ{' '}
            <Link path={`${ROUTER.MODELS_PATH}${ROUTER.FDM_PATH}`} fontSize={19} isInner>
                Функционально-Доменная модель
            </Link>{' '}
            ИТ-ландшафта ВК. По ней есть поиск, а можно просмотреть интересующие группировки и
            возможности доменов. По каждой возможности можно посмотреть детали – владельца,
            ИТ-продукт, API который можно вызвать.
        </S.TextBlock>
    );
};

const TextBlock3 = () => {
    return (
        <S.TextBlock className="TextBlock">
            Можно сделать это самостоятельно, ознакомившись с методикой описания возможностей, а
            если приходится делать это впервые – можно воспользоваться{' '}
            <Link
                path={`${ROUTER.DATA_BASE_PATH}${ROUTER.SERVICES_PATH}${ROUTER.CONSULTATION_PATH}`}
                fontSize={19}
                isInner
            >
                консультацией
            </Link>{' '}
            корпоративного архитектора, который подскажет правильные формулировки, и провалидирует
            подготовленный список.
        </S.TextBlock>
    );
};

const TextBlock4 = () => {
    return (
        <S.TextBlock className="TextBlock">
            В Функционально-Доменной модели позиционируются не сами продукты, а возможности, которые
            продукт предоставляет потребителям. Для позиционирования можно просмотреть ФДМ и
            описание ее доменов, и на основе этих данных подготовить предложения по позиционированию
            возможностей и обсудить его с корпоративным архитектором. Если предложений нет,
            корпоративный архитектор предложит позиционирование самостоятельно исходя из
            предоставленной концепции продукта. Воспользоваться сервисом позиционирования
            корпоративной архитектуры можно{' '}
            <Link path={`${ROUTER.DATA_BASE_PATH}${ROUTER.SERVICES_PATH}`} fontSize={19} isInner>
                тут.
            </Link>{' '}
        </S.TextBlock>
    );
};

const TextBlock5 = () => {
    return (
        <S.TextBlock className="TextBlock">
            Концепцию продукта составляет набор разных сведений – начиная от ценностей,
            предоставляемых продуктом и описания потребителей этих ценностей, заканчивая
            архитектурой и роадмапом продукта. Чтобы не запутаться и ничего не забыть, можно
            воспользоваться подготовленной{' '}
            <Link
                path={`${ROUTER.DATA_BASE_PATH}${ROUTER.ARCH_COMM_PATH}${ROUTER.ARCH_HOW_TO_PATH}`}
                fontSize={19}
                isInner
            >
                инструкцией,
            </Link>{' '}
            <Link
                path={`${ROUTER.DATA_BASE_PATH}${ROUTER.ARCH_COMM_PATH}${ROUTER.ARCH_TEMPLATES_PATH}`}
                fontSize={19}
                isInner
            >
                шаблоном,
            </Link>{' '}
            или посмотреть примеры концепций продуктов, которые уже прошли защиту на Архитектурном
            комитете.
        </S.TextBlock>
    );
};

// TODO: add props
export const Accordion = (props: any) => {
    const data = [
        {
            id: 0,
            title: 'Что нужно для выхода и защиты на АК?',
            text: <TextBlock1 />,
            isOpen: false,
        },
        {
            id: 1,
            title: 'Какие возможности на ландшафте можно переиспользовать?',
            text: <TextBlock2 />,
            isOpen: false,
        },
        {
            id: 2,
            title: 'Как описать возможности моего продукта?',
            text: <TextBlock3 />,
            isOpen: false,
        },
        {
            id: 3,
            title: 'В какие домены на ФДМ спозиционировать мой продукт?',
            text: <TextBlock4 />,
            isOpen: false,
        },
        {
            id: 4,
            title: 'Какие сведения составляют Концепцию продукта?',
            text: <TextBlock5 />,
            isOpen: false,
        },
    ];

    // const [dataOfAccordion, setDataOfAccordion] = useState(data);
    const [isActive, setActive] = useState<number | null>(null);

    // const toggleHandler = (index: number) => {
    //     setDataOfAccordion((prevState) =>
    //         prevState.map((item) => {
    //             if (item.id === index) {
    //                 return { ...item, isOpen: !item.isOpen };
    //             }

    //             return item;
    //         }),
    //     );
    // };

    const toggleHandler = (index: number) => {
        if (isActive === index) {
            setActive(null);
        } else {
            setActive(index);
        }
    };

    return (
        <S.Container className="AccordionContainer" {...props}>
            {data.map((item, index) => (
                <S.Item className="AccordionItem" key={index} onClick={() => toggleHandler(index)}>
                    <S.TitleBlock className="AccordionTitleBlock">
                        {item.title} <PivotArrow isOpen={isActive === index} />
                    </S.TitleBlock>

                    <S.ExpandStyled isOpen={isActive === index}>{item.text}</S.ExpandStyled>
                </S.Item>
            ))}
        </S.Container>
    );
};
