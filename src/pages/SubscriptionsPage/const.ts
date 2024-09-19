import { SubscriptionEntityVariants, SubscriptionType } from 'api/subscriptions/types';
import * as R from 'router/const';

export enum FilterVariants {
    ALL = 'ALL',
    BUSINESS_CAPABILITIES = 'BUSINESS_CAPABILITIES',
    TECH_CAPABILITIES = 'TECH_CAPABILITIES',
    TECHNOLOGIES = 'TECHNOLOGIES',
}

export const CHIPS = [
    {
        label: 'Все',
        value: FilterVariants.ALL,
    },
    {
        label: 'Бизнес-возможности',
        value: FilterVariants.BUSINESS_CAPABILITIES,
    },
    {
        label: 'Технические возможности',
        value: FilterVariants.TECH_CAPABILITIES,
    },
    {
        label: 'Технологии',
        value: FilterVariants.TECHNOLOGIES,
    },
    // {
    //     label: 'CJ',
    //     value: FilterVariants.CJS,
    // },
];

export const filterVariantToNotFoundTextMap = {
    [FilterVariants.ALL]: 'Здесь будут ваши подписки',
    [FilterVariants.BUSINESS_CAPABILITIES]: 'Подписаться на возможности можно в разделе «ФДМ»',
    [FilterVariants.TECH_CAPABILITIES]: 'Подписаться на возможности можно в разделе «ФДМ»',
    [FilterVariants.TECHNOLOGIES]: 'Подписаться на технологии можно в разделе «Технорадар»',
    // [FilterVariants.CJS]: 'Подписаться на CJ можно в библиотеке',
};

export const filterVariantToButtonTextMap = {
    [FilterVariants.BUSINESS_CAPABILITIES]: 'Перейти в ФДМ',
    [FilterVariants.TECH_CAPABILITIES]: 'Перейти в ФДМ',
    [FilterVariants.TECHNOLOGIES]: 'Перейти в технорадар',
    // [FilterVariants.CJS]: 'Перейти в библиотеку СJ',.
};

export const filterVariantToRouteMap = {
    [FilterVariants.BUSINESS_CAPABILITIES]: `${R.MODELS_PATH}${R.FDM_PATH}`,
    [FilterVariants.TECH_CAPABILITIES]: `${R.MODELS_PATH}${R.FDM_PATH}`,
    [FilterVariants.TECHNOLOGIES]: `${R.MODELS_PATH}${R.TECH_RADAR_PATH}`,
    // [FilterVariants.CJS]: `${R.CX_PATH}${R.CJ_PATH}`,
};

export const subscriptionTypeToTitleMap = {
    [SubscriptionType.BUSINESS_CAPABILITY]: 'возможности',
    [SubscriptionType.TECH_CAPABILITY]: 'возможности',
    [SubscriptionType.GROUP]: 'группировки',
    [SubscriptionType.DOMAIN]: 'домена',
    [SubscriptionType.CJ]: 'CJ',
    [SubscriptionType.TECHNOLOGY]: 'технологии',
};

export const subscriptionTypeToEntityVariantMap = {
    [SubscriptionType.BUSINESS_CAPABILITY]: SubscriptionEntityVariants.BUSINESS_CAPABILITY,
    [SubscriptionType.TECH_CAPABILITY]: SubscriptionEntityVariants.TECH_CAPABILITY,
    [SubscriptionType.GROUP]: SubscriptionEntityVariants.BUSINESS_CAPABILITY,
    [SubscriptionType.DOMAIN]: SubscriptionEntityVariants.BUSINESS_CAPABILITY,
    [SubscriptionType.CJ]: SubscriptionEntityVariants.TECH,
    [SubscriptionType.TECHNOLOGY]: SubscriptionEntityVariants.TECH,
};
