export enum NotificationEntityType {
    TECH_CAPABILITY = 'TECH_CAPABILITY',
    BUSINESS_CAPABILITY = 'BUSINESS_CAPABILITY',
    TECHNOLOGY = 'TECHNOLOGY',
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
