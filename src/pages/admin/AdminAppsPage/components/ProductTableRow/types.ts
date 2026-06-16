import { IFullProductData } from 'api/product/types';

export interface IProductTableRow {
    product: IFullProductData;
    setProductToDelete: (product: IFullProductData) => void;
}
