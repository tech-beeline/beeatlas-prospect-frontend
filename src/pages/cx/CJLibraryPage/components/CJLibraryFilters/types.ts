import { CJLibraryStatus } from 'api/cj/types';

import { FormatVariant, ProductVariant } from './const';

export interface ICJFilterOptions {
    search: string;
    product: ProductVariant | number | null;
    status: CJLibraryStatus;
    format: FormatVariant;
    channel: number[];
    grafana: boolean;
}
export interface ICJLibraryFilters {
    filterOptions: ICJFilterOptions;
    setFilterOptions: (filterOptions: ICJFilterOptions) => void;
    resetFilters: () => void;
    hasActiveFilters: boolean;
    onClose: () => void;
}
