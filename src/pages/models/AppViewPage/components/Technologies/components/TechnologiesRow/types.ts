import type { IProductEmbeddedTech, IProductTechProduct } from 'api/product/types';

export interface ITechnologiesRow {
    techProduct: IProductTechProduct & { tech: IProductEmbeddedTech };
}
