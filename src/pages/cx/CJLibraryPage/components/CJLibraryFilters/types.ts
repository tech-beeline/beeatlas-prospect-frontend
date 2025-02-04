import { CJLibraryStatus } from 'api/cj/types';

import { ProductVariant } from './const';

export interface IFilterOptions {
    search: string;
    product: ProductVariant | number | null;
    status: CJLibraryStatus;
}
export interface ICJLibraryFilters {
    filterOptions: IFilterOptions;
    setFilterOptions: (filterOptions: IFilterOptions) => void;
}
