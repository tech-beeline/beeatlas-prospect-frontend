import { DraftVariants, ProductVariant, StatusVariant } from './const';

export interface IFilterOptions {
    search: string;
    product: ProductVariant | number;
    status: StatusVariant | number;
    draft: DraftVariants;
}
export interface IBILibraryFilters {
    filterOptions: IFilterOptions;
    setFilterOptions: (filterOptions: IFilterOptions) => void;
}
