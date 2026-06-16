import { IFitnessFunctionsAggregationResult } from 'api/product/types';

export interface IAnalyticalTable {
    fitnessFunctionsData: IFitnessFunctionsAggregationResult;
    autoExpandedDomainIds?: number[];
}

export enum RowItems {
    DOMAIN = 'DOMAIN',
    PRODUCT = 'PRODUCT',
}

export interface IDomainRowItem {
    type: RowItems.DOMAIN;
    domainId: number;
    domainIndex: number;
}

export interface IProductRowItem {
    type: RowItems.PRODUCT;
    domainId: number;
    domainIndex: number;
    productIndex: number;
}

export type IRowItem = IDomainRowItem | IProductRowItem;

export type AnalyticalTableHandle = {
    exportToExcel: () => void;
};

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export interface ISortOption {
    code: string;
    direction: SortDirection;
}
