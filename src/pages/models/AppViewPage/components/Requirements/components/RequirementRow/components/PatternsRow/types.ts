import { IPattern } from 'api/patterns/types';
import { IProductPattern } from 'api/product/types';

export interface IPatternsRow {
    patterns: Omit<IPattern, 'groups' | 'technologies'>[];
    productPatterns: IProductPattern[];
}
