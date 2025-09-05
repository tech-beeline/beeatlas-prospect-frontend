import { IFullProductData } from 'api/product/types';

export interface IGeneralInfo {
    productData?: IFullProductData;
    isLoading: boolean;
}
