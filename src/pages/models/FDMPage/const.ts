export enum TabVariant {
    GENERAL = 'GENERAL',
    HISTORY = 'HISTORY',
}

export const TABS = [
    { label: 'Общая информация', value: TabVariant.GENERAL },
    { label: 'История изменения', value: TabVariant.HISTORY },
];

export enum MetricsVariants {
    API = 'API',
    E2E = 'E2E',
    CJ = 'CJ',
}
