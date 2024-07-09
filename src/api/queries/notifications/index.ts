import { useQuery } from 'react-query';

import { INotification, NotificationType } from 'api/notifications/types';

const NOTIFICATIONS_PREFIX = 'NOTIFICATIONS_PREFIX';

export const useGetNotificationsQuery = () => {
    return useQuery<INotification[]>(
        [NOTIFICATIONS_PREFIX, 'ALL'],
        () =>
            new Promise<INotification[]>((res) => {
                setTimeout(() => {
                    res([
                        {
                            id: 1,
                            changeDate: new Date(),
                            webNotify: true,
                            entityId: 1,
                            entityLink: '/123',
                            changeType: 'изменена',
                            entityName: 'Figma',
                            entityType: NotificationType.TECHNOLOGY,
                        },
                        {
                            id: 2,
                            changeDate: new Date(),
                            webNotify: false,
                            entityId: 1,
                            entityLink: '/123',
                            changeType: 'создана',
                            entityName: 'Figma',
                            entityType: NotificationType.CAPABILITY,
                        },
                    ]);
                }, 500);
            }),
    );
};
