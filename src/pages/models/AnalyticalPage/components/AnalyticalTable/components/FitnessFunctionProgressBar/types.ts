import { IFitnessFunctionData, IFitnessFunctionProductData } from 'api/product/types';

export interface IFitnessFunctionProgressBar {
    fitnessFunction: IFitnessFunctionData;
    products: IFitnessFunctionProductData[];
    isExpanded: boolean;
}
