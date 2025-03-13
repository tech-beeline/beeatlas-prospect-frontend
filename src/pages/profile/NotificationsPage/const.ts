import { NotificationEntityType } from 'api/notifications/types';

import { NotificationGroups } from '../../../features/notifications';

export enum FilterVariants {
    ALL = 'ALL',
    BUSINESS_CAPABILITIES = 'BUSINESS_CAPABILITIES',
    TECH_CAPABILITIES = 'TECH_CAPABILITIES',
    TECHNOLOGIES = 'TECHNOLOGIES',
    APPLICATIONS = 'APPLICATIONS',
    EXPORT = 'EXPORT',
}

export const CHIPS = [
    {
        label: 'Все',
        value: FilterVariants.ALL,
        group: NotificationGroups.LANDSCAPE_CHANGES,
    },
    {
        label: 'Бизнес-возможности',
        value: FilterVariants.BUSINESS_CAPABILITIES,
        group: NotificationGroups.LANDSCAPE_CHANGES,
    },
    {
        label: 'Технические возможности',
        value: FilterVariants.TECH_CAPABILITIES,
        group: NotificationGroups.LANDSCAPE_CHANGES,
    },
    {
        label: 'Технологии',
        value: FilterVariants.TECHNOLOGIES,
        group: NotificationGroups.LANDSCAPE_CHANGES,
    },
    {
        label: 'Мои заявки',
        value: FilterVariants.APPLICATIONS,
        group: NotificationGroups.BUSINESS_EVENTS,
    },
    {
        label: 'Экспорт файлов',
        value: FilterVariants.EXPORT,
        group: NotificationGroups.BUSINESS_EVENTS,
    },
];

export enum NotificationVariants {
    ALL = 'ALL',
    UNREAD = 'UNREAD',
    READ = 'READ',
}

export enum SortingVariants {
    LATEST = 'LATEST',
    OLDEST = 'OLDEST',
}

export const filterVariantToNotificationEntityMap = {
    [FilterVariants.BUSINESS_CAPABILITIES]: NotificationEntityType.BUSINESS_CAPABILITY,
    [FilterVariants.TECH_CAPABILITIES]: NotificationEntityType.TECH_CAPABILITY,
    [FilterVariants.TECHNOLOGIES]: NotificationEntityType.TECH,
    [FilterVariants.APPLICATIONS]: NotificationEntityType.APPLICATION,
    [FilterVariants.EXPORT]: NotificationEntityType.EXPORT,
};
