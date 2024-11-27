import { MapVariant } from 'features/maps';

import { ITechCapability } from 'api/capability/types';
import { IPersonalMapGroup, IPersonalMapType } from 'api/maps/types';

export interface IPersonalCapabilityCard {
    item: IPersonalMapGroup;
    withinGrid?: boolean;
    topLevel?: boolean;
    mapVariant: MapVariant;
    mapType: IPersonalMapType;
}

export interface ITechCapabilityCard {
    techCapability: ITechCapability;
}
