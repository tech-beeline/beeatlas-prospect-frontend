import { BusinessNotificationEntityType } from 'api/notifications/types';

export enum FilterVariants {
    ALL = 'ALL',
    BUSINESS_CAPABILITIES = 'BUSINESS_CAPABILITIES',
    TECH_CAPABILITIES = 'TECH_CAPABILITIES',
    TECHNOLOGIES = 'TECHNOLOGIES',
}

export enum BusinessFilterVariants {
    ALL = 'ALL',
    CREATE_BC = 'CREATE_BC',
    EDIT_BC = 'EDIT_BC',
    EXPORT_BC = 'EXPORT_BC',
    EXPORT_TC = 'EXPORT_TC',
    EXPORT_TECH = 'EXPORT_TECH',
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

export const BUSINESS_CHIPS = [
    {
        label: 'Все',
        value: BusinessFilterVariants.ALL,
    },
    {
        label: 'Заявки на создание БС',
        value: BusinessFilterVariants.CREATE_BC,
    },
    {
        label: 'Заявки на изменение БС',
        value: BusinessFilterVariants.EDIT_BC,
    },
    {
        label: 'Экспорт БС',
        value: BusinessFilterVariants.EXPORT_BC,
    },
    {
        label: 'Экспорт ТС',
        value: BusinessFilterVariants.EXPORT_TC,
    },
    {
        label: 'Экспорт технологий',
        value: BusinessFilterVariants.EXPORT_TECH,
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

export const filterVariantToBusinessNotificationEntityMap = {
    [BusinessFilterVariants.CREATE_BC]: BusinessNotificationEntityType.CREATE_BC,
    [BusinessFilterVariants.EDIT_BC]: BusinessNotificationEntityType.EDIT_BC,
    [BusinessFilterVariants.EXPORT_BC]: BusinessNotificationEntityType.EXPORT_BC,
    [BusinessFilterVariants.EXPORT_TC]: BusinessNotificationEntityType.EXPORT_TC,
    [BusinessFilterVariants.EXPORT_TECH]: BusinessNotificationEntityType.EXPORT_TECH,
};
