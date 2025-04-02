export interface IService {
    name: string;
    code: string;
    protocol: string;
    version: string;
    specification: string;
    techCapability: { id: number; name: string };
    methods: {
        name: string;
        description: string;
        rps: number;
        latency: number;
        errorRate: number;
    }[];
}

export interface IInterface {
    name: string;
    services: IService[];
}

export const INTERFACES: IInterface[] = [
    {
        name: 'Dashboard API&UI',
        services: [
            {
                name: 'API управление бизнес-возможностями',
                code: 'capability-api.dashboard.FDMSHOWCASEAPP',
                protocol: 'REST',
                version: '1.2.0',
                specification: 'https://beeline.ru',
                techCapability: {
                    id: 1,
                    name: 'Возможность online-отображения информации в процессе коммуникации сотрудников офисов',
                },
                methods: [
                    {
                        name: 'GET /2.0.0/napi/sim-info',
                        description: 'Управление возможностями и доменами',
                        rps: 10,
                        latency: 1500,
                        errorRate: 99,
                    },
                    {
                        name: 'GET /2.0.0/napi/sim-info',
                        description: 'Управление возможностями и доменами',
                        rps: 10,
                        latency: 1500,
                        errorRate: 99,
                    },
                    {
                        name: 'GET /2.0.0/napi/sim-info',
                        description: 'Управление возможностями и доменами',
                        rps: 10,
                        latency: 1500,
                        errorRate: 99,
                    },
                ],
            },
            {
                name: 'API получение бизнес-терминов',
                code: 'capability-api.dashboard.FDMSHOWCASEAPP',
                protocol: 'REST',
                version: '1.2.0',
                specification: 'https://beeline.ru',
                techCapability: {
                    id: 1,
                    name: 'Возможность online-отображения информации в процессе коммуникации сотрудников офисов',
                },
                methods: [],
            },
            {
                name: 'API управление техническими возможностями',
                code: 'capability-api.dashboard.FDMSHOWCASEAPP',
                protocol: 'REST',
                version: '1.2.0',
                specification: 'https://beeline.ru',
                techCapability: {
                    id: 1,
                    name: 'Возможность online-отображения информации в процессе коммуникации сотрудников офисов',
                },
                methods: [],
            },
            {
                name: 'API управления описанием системам',
                code: 'capability-api.dashboard.FDMSHOWCASEAPP',
                protocol: 'REST',
                version: '1.2.0',
                specification: 'https://beeline.ru',
                techCapability: {
                    id: 1,
                    name: 'Возможность online-отображения информации в процессе коммуникации сотрудников офисов',
                },
                methods: [],
            },
            {
                name: 'API управления описанием E2E процессов',
                code: 'capability-api.dashboard.FDMSHOWCASEAPP',
                protocol: 'REST',
                version: '1.2.0',
                specification: 'https://beeline.ru',
                techCapability: {
                    id: 1,
                    name: 'Возможность online-отображения информации в процессе коммуникации сотрудников офисов',
                },
                methods: [],
            },
        ],
    },
];
