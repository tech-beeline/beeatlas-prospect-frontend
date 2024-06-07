import * as R from 'router/const';

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

export const filterVariantToNotFoundTextMap = {
    [FilterVariants.ALL]: 'Здесь будут ваши подписки',
    [FilterVariants.CAPABILITIES]: 'Подписаться на возможности можно в разделе «ФДМ»',
    [FilterVariants.TECHNOLOGIES]: 'Подписаться на технологии можно в разделе «Технорадар»',
    [FilterVariants.CJS]: 'Подписаться на CJ можно в библиотеке',
};

export const filterVariantToButtonTextMap = {
    [FilterVariants.CAPABILITIES]: 'Перейти в ФДМ',
    [FilterVariants.TECHNOLOGIES]: 'Перейти в технорадар',
    [FilterVariants.CJS]: 'Перейти в библиотеку СJ',
};

export const filterVariantToRouteMap = {
    [FilterVariants.CAPABILITIES]: `${R.MODELS_PATH}${R.FDM_PATH}`,
    [FilterVariants.TECHNOLOGIES]: `${R.MODELS_PATH}${R.TECH_RADAR_PATH}`,
    [FilterVariants.CJS]: `${R.CX_PATH}${R.CJ_PATH}`,
};
