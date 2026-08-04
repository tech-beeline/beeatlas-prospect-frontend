import { IMapItemData, ITechCapability } from 'api/capability/types';
import { IMapCriteria } from 'api/maps/types';

import { MapVariant } from '../../const';

export interface ICapabilityCard {
    item: IMapItemData;
    withinGrid?: boolean;
    topLevel?: boolean;
    mapVariant: MapVariant | IMapCriteria;
}

export interface ITechCapabilityCard {
    techCapability: ITechCapability;
    mapVariant: MapVariant | IMapCriteria;
}
