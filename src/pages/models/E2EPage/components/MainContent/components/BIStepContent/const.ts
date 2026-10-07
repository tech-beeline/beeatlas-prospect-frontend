export enum TabVariants {
    CALLS = 'CALLS',
    USECASE_CALLS = 'USECASE_CALLS',
    OBSERVABILITY = 'OBSERVABILITY',
}

export const TABS = [
    {
        id: TabVariants.CALLS,
        label: 'Вызовы шага E2E-сценария',
    },
    {
        id: TabVariants.USECASE_CALLS,
        label: 'Вызовы Use Case',
    },
    {
        id: TabVariants.OBSERVABILITY,
        label: 'Наблюдаемость',
    },
];
