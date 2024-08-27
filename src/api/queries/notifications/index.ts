import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { patchNotifications } from 'api/notifications';
import { getNotifications } from 'api/notifications';
import { INotificationData, INotificationParams } from 'api/notifications/types';

const NOTIFICATIONS_PREFIX = 'NOTIFICATIONS_PREFIX';

export const useGetNotificationsQuery = (params: INotificationParams) => {
    return useQuery<INotificationData>({
        queryKey: [NOTIFICATIONS_PREFIX, 'ALL', params],
        queryFn: () => getNotifications(params).then((res) => res.data),
        placeholderData: keepPreviousData,
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
