import { NotificationEntityType } from 'api/notifications/types';

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
];

export enum SortingVariants {
    LATEST = 'LATEST',
    OLDEST = 'OLDEST',
}

export const filterVariantToNotificationEntityMap = {
    [FilterVariants.BUSINESS_CAPABILITIES]: NotificationEntityType.BUSINESS_CAPABILITY,
    [FilterVariants.TECH_CAPABILITIES]: NotificationEntityType.TECH_CAPABILITY,
    [FilterVariants.TECHNOLOGIES]: NotificationEntityType.TECH,
};
