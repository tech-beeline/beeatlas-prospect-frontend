import { BiStepTab } from 'features/e2e';

export enum TabVariants {
    CALLS = 'CALLS',
    USECASE_CALLS = 'USECASE_CALLS',
    OBSERVABILITY = 'OBSERVABILITY',
}

export const TABS = [
    {
        id: TabVariants.CALLS,
        param: BiStepTab.E2E,
        label: 'Вызовы шага E2E-сценария',
    },
    {
        id: TabVariants.USECASE_CALLS,
        param: BiStepTab.USE_CASE,
        label: 'Вызовы Use Case',
    },
    {
        id: TabVariants.OBSERVABILITY,
        param: BiStepTab.OBSERVABILITY,
        label: 'Наблюдаемость',
    },
];
