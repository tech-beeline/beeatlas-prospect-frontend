import { IFullProductData } from 'api/product/types';

export interface IGeneralInfo {
    cmdb: string | null;
    productData?: IFullProductData;
    isLoading: boolean;
    structurizrApiUrl: string | null | undefined;
    productId: number;
}
