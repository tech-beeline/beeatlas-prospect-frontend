import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSubscribedCapabilities } from 'api/fdm';
import { CapabilitySearchResultTypeVariant } from 'api/fdm/types';
import { deleteSubscription, postSubscription } from 'api/subscriptions';
import { ISubscription, ISubscriptionForm, SubscriptionType } from 'api/subscriptions/types';

const SUBSCRIPTIONS_PREFIX = 'SUBSCRIPTIONS_PREFIX';

// export const useGetAllSubscriptionsQuery = () => {
//     return useQuery<ISubscription[]>({
//         queryKey: [SUBSCRIPTIONS_PREFIX, 'ALL'],
//         queryFn: async () => {
//             const subscriptions: ISubscription[] = [];

//             const [businessCapabilitiesSubscriptions, techCapabilitiesSubscriptions] =
//                 await Promise.all([
//                     getSubscribedCapabilities(
//                         CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY,
//                     ),
//                     getSubscribedCapabilities(CapabilitySearchResultTypeVariant.TECH_CAPABILITY),
//                 ]);

//             subscriptions.push(
//                 ...businessCapabilitiesSubscriptions.data.map((sub) => ({
//                     id: sub.id,
//                     title: sub.name,
//                     type: sub.isDomain
//                         ? sub.parentId === null
//                             ? SubscriptionType.GROUP
//                             : SubscriptionType.DOMAIN
//                         : SubscriptionType.BUSINESS_CAPABILITY,
//                 })),
//             );

//             subscriptions.push(
//                 ...techCapabilitiesSubscriptions.data.map((sub) => ({
//                     id: sub.id,
//                     title: sub.name,
//                     type: SubscriptionType.TECH_CAPABILITY,
//                 })),
//             );

//             return subscriptions;
//         },
//     });
// };

export const useGetAllSubscriptionsQuery = () => {
    return useQuery<ISubscription[]>({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'ALL'],
        queryFn: async () => {
            return new Promise<ISubscription[]>((res) => {
                setTimeout(() => {
                    res([
                        {
                            id: 1,
                            type: SubscriptionType.BUSINESS_CAPABILITY,
                            title: 'Управление исходящими подписками',
                        },
                        {
                            id: 2,
                            type: SubscriptionType.TECH_CAPABILITY,
                            title: 'Проверка контактной политики в СКП по каждой коммуникации в соответствии с заданной целью и ограничить отправку коммуникаций с учетом настроек КП',
                        },
                        {
                            id: 3,
                            type: SubscriptionType.GROUP,
                            title: 'Заголовок',
                        },
                        {
                            id: 4,
                            type: SubscriptionType.DOMAIN,
                            title: 'Заголовок',
                        },
                        {
                            id: 5,
                            type: SubscriptionType.CJ,
                            title: 'Заголовок',
                        },
                        {
                            id: 6,
                            type: SubscriptionType.TECHNOLOGY,
                            title: 'Заголовок',
                        },
                        {
                            id: 7,
                            type: SubscriptionType.BUSINESS_CAPABILITY,
                            title: 'Управление исходящими подписками',
                        },
                        {
                            id: 8,
                            type: SubscriptionType.TECH_CAPABILITY,
                            title: 'Заголовок',
                        },
                        {
                            id: 9,
                            type: SubscriptionType.GROUP,
                            title: 'Заголовок',
                        },
                        {
                            id: 10,
                            type: SubscriptionType.DOMAIN,
                            title: 'Заголовок',
                        },
                        {
                            id: 11,
                            type: SubscriptionType.CJ,
                            title: 'Заголовок',
                        },
                        {
                            id: 12,
                            type: SubscriptionType.TECHNOLOGY,
                            title: 'Заголовок',
                        },
                    ]);
                }, 500);
            });
        },
    });
};

export const useGetBusinessCapabilitiySubscriptionIdsQuery = () => {
    return useQuery<number[]>({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'BUSINESS_CAPABILITY_IDS'],
        queryFn: async () => {
            const businessCapabilitiesSubscriptions = await getSubscribedCapabilities(
                CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY,
            );

            return businessCapabilitiesSubscriptions.data.map((sub) => sub.id);
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export const useGetTechCapabilitiySubscriptionIdsQuery = () => {
    return useQuery<number[]>({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'TECH_CAPABILITY_IDS'],
        queryFn: async () => {
            const techCapabilitiesSubscriptions = await getSubscribedCapabilities(
                CapabilitySearchResultTypeVariant.TECH_CAPABILITY,
            );

            return techCapabilitiesSubscriptions.data.map((sub) => sub.id);
        },

        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export function useCreateSubscriptionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [SUBSCRIPTIONS_PREFIX, 'create'],
        mutationFn: (data: ISubscriptionForm) => postSubscription(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_PREFIX] });
        },
    });
}

export function useDeleteSubscriptionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [SUBSCRIPTIONS_PREFIX, 'delete'],
        mutationFn: (data: ISubscriptionForm) => deleteSubscription(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_PREFIX] });
        },
    });
}

// new Promise<ISubscription[]>((res) => {
//     setTimeout(() => {
//         res([
//             {
//                 id: 1,
//                 type: SubscriptionType.BUSINESS_CAPABILITY,
//                 title: 'Управление исходящими подписками',
//             },
//             {
//                 id: 2,
//                 type: SubscriptionType.TECH_CAPABILITY,
//                 title: 'Проверка контактной политики в СКП по каждой коммуникации в соответствии с заданной целью и ограничить отправку коммуникаций с учетом настроек КП',
//             },
//             {
//                 id: 3,
//                 type: SubscriptionType.GROUP,
//                 title: 'Заголовок',
//             },
//             {
//                 id: 4,
//                 type: SubscriptionType.DOMAIN,
//                 title: 'Заголовок',
//             },
//             {
//                 id: 5,
//                 type: SubscriptionType.CJ,
//                 title: 'Заголовок',
//             },
//             {
//                 id: 6,
//                 type: SubscriptionType.TECHNOLOGY,
//                 title: 'Заголовок',
//             },
//             {
//                 id: 7,
//                 type: SubscriptionType.BUSINESS_CAPABILITY,
//                 title: 'Управление исходящими подписками',
//             },
//             {
//                 id: 8,
//                 type: SubscriptionType.TECH_CAPABILITY,
//                 title: 'Заголовок',
//             },
//             {
//                 id: 9,
//                 type: SubscriptionType.GROUP,
//                 title: 'Заголовок',
//             },
//             {
//                 id: 10,
//                 type: SubscriptionType.DOMAIN,
//                 title: 'Заголовок',
//             },
//             {
//                 id: 11,
//                 type: SubscriptionType.CJ,
//                 title: 'Заголовок',
//             },
//             {
//                 id: 12,
//                 type: SubscriptionType.TECHNOLOGY,
//                 title: 'Заголовок',
//             },
//         ]);
//     }, 500);
// }),
