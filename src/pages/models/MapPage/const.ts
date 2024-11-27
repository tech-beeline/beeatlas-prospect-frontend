import { MapVariant } from 'features/maps';

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

export const mapVariantToDescriptionMap: Record<MapVariant, string> = {
    [MapVariant.DEFAULT]: '',
    [MapVariant.TECH_CAPABILITIES]: 'Количество TC',
    [MapVariant.E2E_SCENARIOS]: 'Количество е2е сценариев',
};
