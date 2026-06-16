import { IActiveItem, ItemTypes } from 'pages/models/LifeSituationsPage/types';

import { DisplayOptions } from '../../types';

export interface IRequirements {
    displayOption: DisplayOptions;
    activeItem: Extract<IActiveItem, { type: ItemTypes.CHAPTER }>;
}
