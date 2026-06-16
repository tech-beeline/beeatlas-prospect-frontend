export enum FilterVariants {
    ALL = 'ALL',
    PATTERNS = 'PATTERNS',
    ANTIPATTERNS = 'ANTIPATTERNS',
}

export const CHIPS = [
    {
        label: 'Все',
        value: FilterVariants.ALL,
    },
    {
        label: 'Паттерны',
        value: FilterVariants.PATTERNS,
    },
    {
        label: 'Антипаттерны',
        value: FilterVariants.ANTIPATTERNS,
    },
];
