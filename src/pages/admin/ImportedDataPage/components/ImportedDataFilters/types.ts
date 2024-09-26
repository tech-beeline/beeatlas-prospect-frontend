import { StatusVariants } from './const';

export interface IFilterOptions {
    dates: string[];
    status: StatusVariants;
}

export interface IImportedDataFilters {
    filterOptions: IFilterOptions;
    setFilterOptions: (filterOptions: IFilterOptions) => void;
}
