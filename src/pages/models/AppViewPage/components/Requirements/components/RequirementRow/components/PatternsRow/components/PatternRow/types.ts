import { IPattern } from 'api/patterns/types';
import { IProductPattern } from 'api/product/types';

export interface IPatternRow {
    pattern: Omit<IPattern, 'groups' | 'technologies'>;
    productPatterns: IProductPattern[];
}
