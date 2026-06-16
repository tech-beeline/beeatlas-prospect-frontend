import { IPattern } from 'api/patterns/types';
import { IActiveItem, ItemTypes } from 'pages/models/LifeSituationsPage/types';

import { DisplayOptions } from '../../types';

export interface IPatterns {
    displayOption: DisplayOptions;
    patterns: IPattern[];
    activeItem: Extract<IActiveItem, { type: ItemTypes.CHAPTER }>;
}
