import { INonFunctionalRequirement } from 'api/product/types';
import { IActiveItem, ItemTypes } from 'pages/models/LifeSituationsPage/types';

export interface IRequirementCard {
    nfr: INonFunctionalRequirement;
    activeItem: Extract<IActiveItem, { type: ItemTypes.CHAPTER }>;
}
