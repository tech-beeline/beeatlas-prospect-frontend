export enum FilterVariants {
    ALL = 'ALL',
    CAPABILITIES = 'CAPABILITIES',
    TECHNOLOGIES = 'TECHNOLOGIES',
    CJS = 'CJS',
}

export const CHIPS = [
    {
        label: 'Все',
        value: FilterVariants.ALL,
    },
    {
        label: 'Возможности',
        value: FilterVariants.CAPABILITIES,
    },
    {
        label: 'Технологии',
        value: FilterVariants.TECHNOLOGIES,
    },
    {
        label: 'CJ',
        value: FilterVariants.CJS,
    },
];

export enum SortingVariants {
    LATEST = 'LATEST',
    OLDEST = 'OLDEST',
}
