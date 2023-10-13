import { create } from 'zustand';

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

export const tableInitialData: Step[] = [
    {
        columnName: 'Название шага',
        bis: [],
    },
];

export const businessInteraction: BI = {
    id: 100000,
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
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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

interface IMockCJStore {
    bis: BI[];

    getAllBis: () => BI[];
    getBiById: (id: number) => BI | undefined;

    createBi: (data: BI) => void;
    updateBi: (id: number, data: BI) => void;
}

export const useMockCJtore = create<IMockCJStore>()((set, get) => ({
    bis: SEARCH_BIS,

    getAllBis: () => get().bis,

    getBiById: (id) => get().bis.find((bi) => bi.id === id),

    createBi: (data) => {
        set({ bis: [...get().bis, { ...data, id: get().bis.length + 1 }] });
    },

    updateBi: (id, data) => {
        set({ bis: get().bis.map((bi) => (bi.id === id ? data : bi)) });
    },
}));
