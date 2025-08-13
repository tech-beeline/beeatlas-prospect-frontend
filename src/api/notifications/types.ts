export enum NotificationEntityType {
    TECH_CAPABILITY = 'TECH_CAPABILITY',
    BUSINESS_CAPABILITY = 'BUSINESS_CAPABILITY',
    TECH = 'TECH',
    APPLICATION = 'APPLICATION',
    EXPORT = 'EXPORT',
}

export enum BusinessNotificationEntityType {
    CREATE_BC = 'create_business_capability',
    EDIT_BC = 'update_business_capability',
    EXPORT_BC = 'business-capability',
    EXPORT_TC = 'tech-capability',
    EXPORT_TECH = 'tech',
}

export enum NotificationChangeType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export interface INotification {
    id: number;
    webNotify: boolean;
    changeDate: Date;
    entityId: number;
    changeType: NotificationChangeType;
    entityName: string;
    entityLink: string;
    entityType: NotificationEntityType;
}

export interface INotificationData {
    content: INotification[];
    totalElements: number;
    totalPages: number;
}

export interface INotificationParams {
    afterDate?: string;
    beforeDate?: string;
    page?: number;
    type?: NotificationEntityType;
    businessType?: BusinessNotificationEntityType;
    wasNotify?: boolean;
}

export interface IBusinessNotification {
    createdDate: string;
    entityId: number;
    entityTypeId: {
        description: string;
        id: number;
        name: string;
    };
    id: number;
    webNotify: boolean;
    name: string;
}

export interface IBusinessNotificationData {
    content: IBusinessNotification[];
    totalElements: number;
    totalPages: number;
}
