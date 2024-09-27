import { FilterVariants } from '../../const';

export interface ISubscriptionFilters {
    search: string;
    setSearch: (search: string) => void;
    setPage: (page: number) => void;
    filterVariant: FilterVariants;
    setFilterVariant: (filterVariant: FilterVariants) => void;
}
