export enum NotificationEntityType {
    TECH_CAPABILITY = 'TECH_CAPABILITY',
    BUSINESS_CAPABILITY = 'BUSINESS_CAPABILITY',
    TECH = 'TECH',
}

export enum NotificationChangeType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
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

export interface INotificationParams {
    afterDate?: string;
    beforeDate?: string;
    page?: number;
    type?: NotificationEntityType;
}
