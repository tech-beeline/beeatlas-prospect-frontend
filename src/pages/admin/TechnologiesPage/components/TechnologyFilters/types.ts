import { IFilterOptions } from '../../types';

export interface ITechnologyFilters {
    filterOptions: IFilterOptions;
    setFilterOptions: (filterOptions: IFilterOptions) => void;
    setCountPage: (count: number) => void;
    isLoading: boolean;
}
