import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import * as R from 'router/const';

export enum FilterVariants {
    ALL = 'ALL',
}

export const filterVariantToNotFoundTextMap = {
    [FilterVariants.ALL]: 'Здесь будут ваши подписки',
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]:
        'Подписаться на возможности можно в разделе «ФДМ»',
    [SubscriptionEntityVariants.TECH_CAPABILITY]:
        'Подписаться на возможности можно в разделе «ФДМ»',
    [SubscriptionEntityVariants.TECH]: 'Подписаться на технологии можно в разделе «Технорадар»',
    [SubscriptionEntityVariants.ARCH_INTERFACE]:
        'Подписаться на интерфейсы можно в разделе «Каталог приложений»',
    [SubscriptionEntityVariants.PATTERN]:
        'Подписаться на паттерны можно в разделе «Каталог паттернов»',
};

export const filterVariantToButtonTextMap = {
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]: 'Перейти в ФДМ',
    [SubscriptionEntityVariants.TECH_CAPABILITY]: 'Перейти в ФДМ',
    [SubscriptionEntityVariants.TECH]: 'Перейти в технорадар',
    [SubscriptionEntityVariants.ARCH_INTERFACE]: 'Перейти в каталог приложений',
    [SubscriptionEntityVariants.PATTERN]: 'Перейти в каталог паттернов',
};

export const filterVariantToRouteMap = {
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]: `${R.MODELS_PATH}${R.FDM_PATH}`,
    [SubscriptionEntityVariants.TECH_CAPABILITY]: `${R.MODELS_PATH}${R.FDM_PATH}`,
    [SubscriptionEntityVariants.TECH]: `${R.MODELS_PATH}${R.TECH_RADAR_PATH}`,
    [SubscriptionEntityVariants.ARCH_INTERFACE]: `${R.MODELS_PATH}${R.APPS_PATH}`,
    [SubscriptionEntityVariants.PATTERN]: `${R.MODELS_PATH}${R.PATTERNS_PATH}`,
};

export const subscriptionTypeToTitleMap = {
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]: 'бизнес-возможности',
    [SubscriptionEntityVariants.TECH_CAPABILITY]: 'технической возможности',
    [SubscriptionEntityVariants.TECH]: 'технологии',
    [SubscriptionEntityVariants.ARCH_INTERFACE]: 'интерфейса',
    [SubscriptionEntityVariants.PATTERN]: 'паттерна',
};

// export const subscriptionTypeToEntityVariantMap = {
//     [SubscriptionType.BUSINESS_CAPABILITY]: SubscriptionEntityVariants.BUSINESS_CAPABILITY,
//     [SubscriptionType.TECH_CAPABILITY]: SubscriptionEntityVariants.TECH_CAPABILITY,
//     [SubscriptionType.GROUP]: SubscriptionEntityVariants.BUSINESS_CAPABILITY,
//     [SubscriptionType.DOMAIN]: SubscriptionEntityVariants.BUSINESS_CAPABILITY,
//     [SubscriptionType.CJ]: SubscriptionEntityVariants.TECH,
//     [SubscriptionType.TECHNOLOGY]: SubscriptionEntityVariants.TECH,
// };
