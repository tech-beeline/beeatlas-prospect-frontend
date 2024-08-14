import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { patchNotifications } from 'api/notifications';
// import { getNotifications } from 'api/notifications';
import {
    INotification,
    NotificationChangeType,
    NotificationEntityType,
} from 'api/notifications/types';

const NOTIFICATIONS_PREFIX = 'NOTIFICATIONS_PREFIX';

// export const useGetNotificationsQuery = () => {
//     return useQuery<INotification[]>({
//         queryKey: [NOTIFICATIONS_PREFIX, 'ALL'],
//         queryFn: () => getNotifications().then((res) => res.data),
//         refetchInterval: 30 * 1000,
//     });
// };

export const useGetNotificationsQuery = () => {
    return useQuery<INotification[]>({
        queryKey: [NOTIFICATIONS_PREFIX, 'ALL'],
        queryFn: () =>
            new Promise<INotification[]>((res) => {
                setTimeout(() => {
                    res([
                        {
                            id: 1,
                            changeDate: new Date(),
                            webNotify: true,
                            entityId: 1,
                            entityLink: '/123',
                            changeType: NotificationChangeType.UPDATE,
                            entityName: 'Figma',
                            entityType: NotificationEntityType.TECHNOLOGY,
                        },
                        {
                            id: 2,
                            changeDate: new Date(),
                            webNotify: false,
                            entityId: 1,
                            entityLink: '/123',
                            changeType: NotificationChangeType.CREATE,
                            entityName: 'Figma',
                            entityType: NotificationEntityType.BUSINESS_CAPABILITY,
                        },
                        {
                            id: 3,
                            changeDate: new Date(),
                            webNotify: false,
                            entityId: 1,
                            entityLink: '/123',
                            changeType: NotificationChangeType.CREATE,
                            entityName: 'Figma',
                            entityType: NotificationEntityType.TECH_CAPABILITY,
                        },
                    ]);
                }, 500);
            }),
        refetchInterval: 30 * 1000,
    });
};

export const useUpdateNotificationsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [NOTIFICATIONS_PREFIX, 'update'],
        mutationFn: async (ids: number[]) => {
            await patchNotifications(ids);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_PREFIX] });
        },
    });
};
