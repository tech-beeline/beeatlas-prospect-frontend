import { IMapItemData, ITechCapability } from 'api/capability/types';

import { MapVariant } from '../../const';

export interface ICapabilityCard {
    item: IMapItemData;
    withinGrid?: boolean;
    topLevel?: boolean;
    mapVariant: MapVariant;
}

export interface ITechCapabilityCard {
    techCapability: ITechCapability;
}
