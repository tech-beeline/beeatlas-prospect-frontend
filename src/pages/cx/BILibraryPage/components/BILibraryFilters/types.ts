import { CharacterVariant, ProductVariant, StatusVariant } from './const';

export interface IBIFilterOptions {
    search: string;
    product: ProductVariant | number | null;
    status: StatusVariant;
    character: CharacterVariant;
    channel: number[];
}

export interface IBILibraryFilters {
    filterOptions: IBIFilterOptions;
    setFilterOptions: (filterOptions: IBIFilterOptions) => void;
    onClose: () => void;
}
