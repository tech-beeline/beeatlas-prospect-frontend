import { INotification } from 'api/notifications/types';

export interface INotificationCard {
    notification: INotification;
    entityAlias: string;
}
