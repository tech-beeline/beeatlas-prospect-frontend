import { IProductEmbeddedTech, IProductTechProduct } from 'api/product/types';

export interface ITechnologies {
    cmdb: string | null;
}

export type TechAutocompleteOption = { id: number | string; value: string };
export type TechProductWithTech = IProductTechProduct & { tech: IProductEmbeddedTech };
