export enum MapVariant {
    DEFAULT = 'DEFAULT',
    TECH_CAPABILITIES = 'TECH_CAPABILITIES',
    E2E_SCENARIOS = 'E2E_SCENARIOS',
}

export enum TabVariant {
    GENERAL = 'GENERAL',
    PERSONAL = 'PERSONAL',
}

export const CHIPS = [
    {
        label: 'По умолчанию',
        value: MapVariant.DEFAULT,
    },
    {
        label: 'Технические возможности',
        value: MapVariant.TECH_CAPABILITIES,
    },
    // {
    //     label: 'e2e сценарии',
    //     value: MapVariant.E2E_SCENARIOS,
    // },
];

export const TABS = [
    { label: 'Общая карта', value: TabVariant.GENERAL },
    { label: 'Мои карты', value: TabVariant.PERSONAL },
];

export const TECH_CAPABILITIES_COLORS = [
    'var(--color-status-error-background)',
    'var(--color-status-warning-background)',
    'var(--color-status-success-background)',
];

export const E2E_SCENARIOS_COLORS = ['#E0F7FB', '#B2EBF5', '#80DEEF', '#4DD0E7', '#25C6E0'];

export const mapVariantToColorArrayMap: Record<MapVariant, string[]> = {
    [MapVariant.DEFAULT]: [],
    [MapVariant.TECH_CAPABILITIES]: TECH_CAPABILITIES_COLORS,
    [MapVariant.E2E_SCENARIOS]: E2E_SCENARIOS_COLORS,
};

export const mapVariantToDescriptionMap: Record<MapVariant, string> = {
    [MapVariant.DEFAULT]: '',
    [MapVariant.TECH_CAPABILITIES]: 'Количество TC',
    [MapVariant.E2E_SCENARIOS]: 'Количество е2е сценариев',
};
