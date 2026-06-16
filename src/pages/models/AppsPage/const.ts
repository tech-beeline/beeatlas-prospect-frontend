export interface IApplication {
    name: string;
    childrenBlocks: IApplication[];
    childrenApps: {
        name: string;
        cmdbMnemonic: string;
        status: string;
    }[];
}

export const APPLICATIONS: IApplication[] = [
    {
        name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
        childrenBlocks: [
            {
                name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                childrenBlocks: [
                    {
                        name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                        childrenBlocks: [],
                        childrenApps: [
                            {
                                name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                                cmdbMnemonic: 'CMDB_BRUH_123',
                                status: 'success',
                            },
                            {
                                name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                                cmdbMnemonic: 'CMDB_BRUH_123',
                                status: 'success',
                            },
                        ],
                    },
                ],
                childrenApps: [],
            },
        ],
        childrenApps: [],
    },
    {
        name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
        childrenBlocks: [],
        childrenApps: [
            {
                name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                cmdbMnemonic: 'CMDB_BRUH_123',
                status: 'success',
            },
            {
                name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                cmdbMnemonic: 'CMDB_BRUH_123',
                status: 'success',
            },
        ],
    },
    {
        name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
        childrenBlocks: [
            {
                name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                childrenBlocks: [],
                childrenApps: [],
            },
            {
                name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                childrenBlocks: [],
                childrenApps: [],
            },
            {
                name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                childrenBlocks: [],
                childrenApps: [
                    {
                        name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                        cmdbMnemonic: 'CMDB_BRUH_123',
                        status: 'success',
                    },
                    {
                        name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                        cmdbMnemonic: 'CMDB_BRUH_123',
                        status: 'success',
                    },
                    {
                        name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                        cmdbMnemonic: 'CMDB_BRUH_123',
                        status: 'success',
                    },
                    {
                        name: 'Блок клиентского обслуживания и сервиса розничного бизнеса',
                        cmdbMnemonic: 'CMDB_BRUH_123',
                        status: 'success',
                    },
                ],
            },
        ],
        childrenApps: [],
    },
];
