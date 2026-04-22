import { IPattern } from 'api/patterns/types';
import { IActiveItem, ItemTypes } from 'pages/models/LifeSituationsPage/types';

export interface IPatternsTable {
    patterns: IPattern[];
    activeItem: Extract<IActiveItem, { type: ItemTypes.CHAPTER }>;
}
