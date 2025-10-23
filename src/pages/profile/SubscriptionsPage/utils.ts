import { ISubscriptionV2 } from 'api/subscriptions/types';

import { FilterVariants } from './const';

export const subscriptionFilterFunction = (
    subscriptions: ISubscriptionV2[],
    filterVariant: FilterVariants | string,
    search: string,
    ascendingOrder: boolean,
): ISubscriptionV2[] =>
    subscriptions
        .filter((subscription) => {
            if (filterVariant === FilterVariants.ALL) return true;
            return subscription.entityType === filterVariant;
        })
        .filter((subscription) => subscription.name?.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) =>
            ascendingOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
        );
