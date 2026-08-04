import { SubscriptionEntityVariants } from 'api/subscriptions/types';

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
    changeType: NotificationChangeType;
    changeDescription: string;
    entityId: number;
    entityName: string;
    entityLink: string;
    entityType: SubscriptionEntityVariants;
    linkTemplate: string | null;
    childrenEntityId: number | null;
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
    type?: SubscriptionEntityVariants;
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
