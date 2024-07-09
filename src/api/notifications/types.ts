export enum NotificationType {
    CAPABILITY = 'CAPABILITY',
    TECHNOLOGY = 'TECHNOLOGY',
}

export interface INotification {
    id: number;
    webNotify: boolean;
    changeDate: Date;
    entityId: number;
    changeType: string;
    entityName: string;
    entityLink: string;
    entityType: NotificationType;
}
