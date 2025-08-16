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

export enum InterfaceOptions {
    STRUCTURIZR = 'STRUCTURIZR',
    MAPIC = 'MAPIC',
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

export interface IAdminInterface {
    name: string;
    contextApi: string;
    contextProvider: string;
    aaacInterface: string;
    methods: { mapicMethod: string; aaacMethod: string }[];
}

export const ADMIN_INTERFACES: IAdminInterface[] = [
    {
        name: 'API управление бизнес-возможностями',
        contextApi: 'prometheus-template-api-queries-rich',
        contextProvider: 'prometheus-template-api-queries-rich',
        aaacInterface: 'prometheus-template-api-queries-rich',
        methods: [
            {
                mapicMethod: 'smev_universal_adapter_sim_contract_cancellation_api_rich',
                aaacMethod: 'prometheus-template-api-queries-rich',
            },
            {
                mapicMethod: 'smev_universal_adapter_sim_contract_cancellation_api_rich',
                aaacMethod: 'prometheus-template-api-queries-rich',
            },
            {
                mapicMethod: 'smev_universal_adapter_sim_contract_cancellation_api_rich',
                aaacMethod: 'prometheus-template-api-queries-rich',
            },
        ],
    },
    {
        name: 'API управление бизнес-возможностями',
        contextApi: 'prometheus-template-api-queries-rich',
        contextProvider: 'prometheus-template-api-queries-rich',
        aaacInterface: 'prometheus-template-api-queries-rich',
        methods: [
            {
                mapicMethod: 'smev_universal_adapter_sim_contract_cancellation_api_rich',
                aaacMethod: 'prometheus-template-api-queries-rich',
            },
            {
                mapicMethod: 'smev_universal_adapter_sim_contract_cancellation_api_rich',
                aaacMethod: 'prometheus-template-api-queries-rich',
            },
            {
                mapicMethod: 'smev_universal_adapter_sim_contract_cancellation_api_rich',
                aaacMethod: 'prometheus-template-api-queries-rich',
            },
        ],
    },
    {
        name: 'API управление бизнес-возможностями',
        contextApi: 'prometheus-template-api-queries-rich',
        contextProvider: 'prometheus-template-api-queries-rich',
        aaacInterface: 'prometheus-template-api-queries-rich',
        methods: [
            {
                mapicMethod: 'smev_universal_adapter_sim_contract_cancellation_api_rich',
                aaacMethod: 'prometheus-template-api-queries-rich',
            },
            {
                mapicMethod: 'smev_universal_adapter_sim_contract_cancellation_api_rich',
                aaacMethod: 'prometheus-template-api-queries-rich',
            },
            {
                mapicMethod: 'smev_universal_adapter_sim_contract_cancellation_api_rich',
                aaacMethod: 'prometheus-template-api-queries-rich',
            },
        ],
    },
];
