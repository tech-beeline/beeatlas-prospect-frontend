import { IProcess } from 'api/camunda/types';
import { IFullProductData } from 'api/product/types';

export interface ICommonInfo {
    productData?: IFullProductData;
    structurizrApiUrl: string | null | undefined;
    productId: number;
    processesData?: IProcess[];
    cmdb: string | null;
}
