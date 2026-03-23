import { IFitenssFunctionsAggregationResult } from 'api/product/types';

export interface IAnalyticalTable {
    fitnessFunctionsData: IFitenssFunctionsAggregationResult;
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
