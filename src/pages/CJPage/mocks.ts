export interface Participant {
    participant: number;
    descr: string;
    value: string;
}

export interface Enter {
    enter: number;
    exit: number;
}

export interface BI {
    id: number;
    name: string;
    communal: boolean;
    descr: string;
    type: number;
    status: number;
    feelings: number;
    clientScenario: string;
    flowLink: string;
    ucsReaction: string;
    participants: Participant[];
    enters: Enter[];
    document: string;
    mockup: string;
    channel: number;
}

export interface Step {
    color?: string;
    columnName?: string;

    bis: BI[];
}

// export const tableInitialData: Step[] = [
//     {
//         columnName: '1',
//         bis: [
//             {
//                 id: 1,
//                 name: 'Авторизация клиента 1',
//                 communal: false,
//                 descr: 'Авторизация Клиента – взаимодействие между Клиентом и Компанией, направленное на предоставление определенному лицу или группе лиц прав на выполнение определенных действий',
//                 type: 0,
//                 status: 0,
//                 feelings: 4,
//                 clientScenario:
//                     'Клиент заполняет предложенные поля ввода, нажимает кнопку «Авторизоваться»',
//                 flowLink: 'https://example.com/',
//                 ucsReaction: 'Описание реакции ЕКП',
//                 participants: [
//                     {
//                         participant: 0,
//                         descr: 'Описание участника 1',
//                         value: 'Ценностный результат 1',
//                     },
//                     {
//                         participant: 0,
//                         descr: 'Описание участника 1',
//                         value: 'Ценностный результат 2',
//                     },
//                 ],
//                 enters: [{ enter: 0, exit: 0 }],
//                 document: 'https://example.com/',
//                 mockup: 'https://example.com/',
//                 channel: 0,
//             },
//             {
//                 id: 2,
//                 name: 'Авторизация клиента 2',
//                 communal: false,
//                 descr: 'Авторизация Клиента – взаимодействие между Клиентом и Компанией, направленное на предоставление определенному лицу или группе лиц прав на выполнение определенных действий',
//                 type: 0,
//                 status: 0,
//                 feelings: 4,
//                 clientScenario:
//                     'Клиент заполняет предложенные поля ввода, нажимает кнопку «Авторизоваться»',
//                 flowLink: 'https://example.com/',
//                 ucsReaction: 'Описание реакции ЕКП',
//                 participants: [
//                     {
//                         participant: 0,
//                         descr: 'Описание участника 1',
//                         value: 'Ценностный результат 1',
//                     },
//                     {
//                         participant: 0,
//                         descr: 'Описание участника 1',
//                         value: 'Ценностный результат 2',
//                     },
//                 ],
//                 enters: [{ enter: 0, exit: 0 }],
//                 document: 'https://example.com/',
//                 mockup: 'https://example.com/',
//                 channel: 0,
//             },
//         ],
//     },
//     {
//         columnName: '2',
//         bis: [
//             {
//                 id: 3,
//                 name: 'Авторизация клиента 3',
//                 communal: false,
//                 descr: 'Авторизация Клиента – взаимодействие между Клиентом и Компанией, направленное на предоставление определенному лицу или группе лиц прав на выполнение определенных действий',
//                 type: 0,
//                 status: 0,
//                 feelings: 4,
//                 clientScenario:
//                     'Клиент заполняет предложенные поля ввода, нажимает кнопку «Авторизоваться»',
//                 flowLink: 'https://example.com/',
//                 ucsReaction: 'Описание реакции ЕКП',
//                 participants: [
//                     {
//                         participant: 0,
//                         descr: 'Описание участника 1',
//                         value: 'Ценностный результат 1',
//                     },
//                     {
//                         participant: 0,
//                         descr: 'Описание участника 1',
//                         value: 'Ценностный результат 2',
//                     },
//                 ],
//                 enters: [{ enter: 0, exit: 0 }],
//                 document: 'https://example.com/',
//                 mockup: 'https://example.com/',
//                 channel: 0,
//             },
//         ],
//     },
// ];

export const tableInitialData: Step[] = [
    {
        columnName: 'Название шага',
        bis: [],
    },
];

export const businessInteraction: BI = {
    id: 4,
    name: 'Авторизация клиента 4',
    communal: false,
    descr: 'Авторизация Клиента – взаимодействие между Клиентом и Компанией, направленное на предоставление определенному лицу или группе лиц прав на выполнение определенных действий',
    type: 0,
    status: 0,
    feelings: 4,
    clientScenario: 'Клиент заполняет предложенные поля ввода, нажимает кнопку «Авторизоваться»',
    flowLink: 'https://example.com/',
    ucsReaction: 'Описание реакции ЕКП',
    participants: [
        {
            participant: 0,
            descr: 'Описание участника 1',
            value: 'Ценностный результат 1',
        },
        {
            participant: 0,
            descr: 'Описание участника 1',
            value: 'Ценностный результат 2',
        },
    ],
    enters: [{ enter: 0, exit: 0 }],
    document: 'https://example.com/',
    mockup: 'https://example.com/',
    channel: 0,
};

export const SEARCH_BIS: BI[] = [
    {
        id: 5,
        name: 'Продуктовый BI 1',
        communal: false,
        descr: 'Авторизация Клиента – взаимодействие между Клиентом и Компанией, направленное на предоставление определенному лицу или группе лиц прав на выполнение определенных действий',
        type: 0,
        status: 0,
        feelings: 4,
        clientScenario:
            'Клиент заполняет предложенные поля ввода, нажимает кнопку «Авторизоваться»',
        flowLink: 'https://example.com/',
        ucsReaction: 'Описание реакции ЕКП',
        participants: [
            {
                participant: 0,
                descr: 'Описание участника 1',
                value: 'Ценностный результат 1',
            },
            {
                participant: 0,
                descr: 'Описание участника 1',
                value: 'Ценностный результат 2',
            },
        ],
        enters: [{ enter: 0, exit: 0 }],
        document: 'https://example.com/',
        mockup: 'https://example.com/',
        channel: 0,
    },
    {
        id: 6,
        name: 'Продуктовый BI 2',
        communal: false,
        descr: 'Авторизация Клиента – взаимодействие между Клиентом и Компанией, направленное на предоставление определенному лицу или группе лиц прав на выполнение определенных действий',
        type: 0,
        status: 0,
        feelings: 4,
        clientScenario:
            'Клиент заполняет предложенные поля ввода, нажимает кнопку «Авторизоваться»',
        flowLink: 'https://example.com/',
        ucsReaction: 'Описание реакции ЕКП',
        participants: [
            {
                participant: 0,
                descr: 'Описание участника 1',
                value: 'Ценностный результат 1',
            },
            {
                participant: 0,
                descr: 'Описание участника 1',
                value: 'Ценностный результат 2',
            },
        ],
        enters: [{ enter: 0, exit: 0 }],
        document: 'https://example.com/',
        mockup: 'https://example.com/',
        channel: 0,
    },
    {
        id: 7,
        name: 'Коммунальный BI 1',
        communal: true,
        descr: 'Авторизация Клиента – взаимодействие между Клиентом и Компанией, направленное на предоставление определенному лицу или группе лиц прав на выполнение определенных действий',
        type: 0,
        status: 0,
        feelings: 4,
        clientScenario:
            'Клиент заполняет предложенные поля ввода, нажимает кнопку «Авторизоваться»',
        flowLink: 'https://example.com/',
        ucsReaction: 'Описание реакции ЕКП',
        participants: [
            {
                participant: 0,
                descr: 'Описание участника 1',
                value: 'Ценностный результат 1',
            },
            {
                participant: 0,
                descr: 'Описание участника 1',
                value: 'Ценностный результат 2',
            },
        ],
        enters: [{ enter: 0, exit: 0 }],
        document: 'https://example.com/',
        mockup: 'https://example.com/',
        channel: 0,
    },
    {
        id: 8,
        name: 'Коммунальный BI 2',
        communal: true,
        descr: 'Авторизация Клиента – взаимодействие между Клиентом и Компанией, направленное на предоставление определенному лицу или группе лиц прав на выполнение определенных действий',
        type: 0,
        status: 0,
        feelings: 4,
        clientScenario:
            'Клиент заполняет предложенные поля ввода, нажимает кнопку «Авторизоваться»',
        flowLink: 'https://example.com/',
        ucsReaction: 'Описание реакции ЕКП',
        participants: [
            {
                participant: 0,
                descr: 'Описание участника 1',
                value: 'Ценностный результат 1',
            },
            {
                participant: 0,
                descr: 'Описание участника 1',
                value: 'Ценностный результат 2',
            },
        ],
        enters: [{ enter: 0, exit: 0 }],
        document: 'https://example.com/',
        mockup: 'https://example.com/',
        channel: 0,
    },
];
