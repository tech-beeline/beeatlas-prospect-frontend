import { IFitenssFunctionsAggregationResult } from 'api/product/types';

export interface IFilterOptions {
    search: string;
    product: string[];
    domain: number[];
    hideEmpty: boolean;
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
    fitnessFunctionsData?: IFitenssFunctionsAggregationResult;
}
