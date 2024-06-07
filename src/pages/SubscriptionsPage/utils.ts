import { ISubscription, SubscriptionType } from 'api/subscriptions/types';

import { FilterVariants } from './const';

export const subscriptionFilterFunction = (
    subscriptions: ISubscription[],
    filterVariant: FilterVariants,
    search: string,
    ascendingOrder: boolean,
): ISubscription[] =>
    subscriptions
        .filter((subscription) => {
            if (filterVariant === FilterVariants.ALL) return true;
            if (filterVariant === FilterVariants.CAPABILITIES)
                return (
                    subscription.type === SubscriptionType.BUSINESS_CAPABILITY ||
                    subscription.type === SubscriptionType.TECH_CAPABILITY ||
                    subscription.type === SubscriptionType.GROUP ||
                    subscription.type === SubscriptionType.DOMAIN
                );
            if (filterVariant === FilterVariants.CJS)
                return subscription.type === SubscriptionType.CJ;
            if (filterVariant === FilterVariants.TECHNOLOGIES)
                return subscription.type === SubscriptionType.TECHNOLOGY;
        })
        .filter((subscription) => subscription.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) =>
            ascendingOrder ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
        );
