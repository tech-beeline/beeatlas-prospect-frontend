import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getBusinessNotifications,
    patchBusinessNotifications,
    patchNotifications,
} from 'api/notifications';
import { getNotifications } from 'api/notifications';
import {
    IBusinessNotificationData,
    INotificationData,
    INotificationParams,
} from 'api/notifications/types';

const NOTIFICATIONS_PREFIX = 'NOTIFICATIONS_PREFIX';

export const useGetNotificationsQuery = (params: INotificationParams) => {
    return useQuery<{
        notifications: INotificationData;
        businessNotifications: IBusinessNotificationData;
    }>({
        queryKey: [NOTIFICATIONS_PREFIX, 'ALL', params],
        queryFn: async () => {
            const res = await Promise.all([
                getNotifications(params).then((res) => res.data),
                getBusinessNotifications({ ...params, businessType: params.businessType }).then(
                    (res) => res.data,
                ),
            ]);
            return { notifications: res[0], businessNotifications: res[1] };
        },
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

export const useUpdateBusinessNotificationsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [NOTIFICATIONS_PREFIX, 'update'],
        mutationFn: async (ids: number[]) => {
            await patchBusinessNotifications(ids);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_PREFIX] });
        },
    });
};
