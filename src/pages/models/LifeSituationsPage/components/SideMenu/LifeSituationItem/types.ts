import { IChapter } from 'api/product/types';

import { IActiveItem } from '../../../types';

export interface ILifeSituationItem {
    item: IChapter;
    activeItem: IActiveItem | null;
}
