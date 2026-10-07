import { IFullProductData } from 'api/product/types';

export interface IProductSelect {
    products: IFullProductData[];
    loading: boolean;
    value: string | null;
    disabled: boolean;
    onChange: (productAlias: string | null) => void;
}
