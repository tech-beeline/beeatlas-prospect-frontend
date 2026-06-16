import { SubscriptionEntityVariants } from 'api/subscriptions/types';

import { FilterVariants } from '../../const';

export interface ISubscriptionFilters {
    search: string;
    setSearch: (search: string) => void;
    setPage: (page: number) => void;
    filterVariant: FilterVariants | SubscriptionEntityVariants;
    setFilterVariant: (filterVariant: FilterVariants | SubscriptionEntityVariants) => void;
}
