import { E2E_SCENARIOS_COLORS } from './components/ScenariosLegend/const';
import { TECH_CAPABILITIES_COLORS } from './components/TechCapabilitiesLegend/const';

export enum MapVariant {
    DEFAULT = 'DEFAULT',
    TECH_CAPABILITIES = 'TECH_CAPABILITIES',
    E2E_SCENARIOS = 'E2E_SCENARIOS',
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
