import { FitnessFunctionStatus } from 'features/fitness-functions';

import { IFitnessFunctionsAggregationResult } from 'api/product/types';

export interface IFilterOptions {
    search: string;
    product: string[];
    domain: number[];
    fitnessFunctions: number[];
    hideEmpty: boolean;
    status: FitnessFunctionStatus | null;
}

export enum SearchResultType {
    DOMAIN = 'DOMAIN',
    PRODUCT = 'PRODUCT',
}

export interface ISearchResultItem {
    type: SearchResultType;
    id: number;
    label: string;
}

export interface IFilters {
    filterOptions: IFilterOptions;
    setFilterOptions: (next: IFilterOptions | ((prev: IFilterOptions) => IFilterOptions)) => void;
    fitnessFunctionsData?: IFitnessFunctionsAggregationResult;
    isLoading: boolean;
}
