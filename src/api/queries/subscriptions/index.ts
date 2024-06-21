import { useQuery } from 'react-query';

import { ISubscription, SubscriptionType } from 'api/subscriptions/types';

const SUBSCRIPTIONS_PREFIX = 'SUBSCRIPTIONS_PREFIX';

export const useGetSubscriptionsQuery = () => {
    return useQuery<ISubscription[]>(
        [SUBSCRIPTIONS_PREFIX, 'ALL'],
        () =>
            new Promise<ISubscription[]>((res) => {
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
            }),
    );
};
