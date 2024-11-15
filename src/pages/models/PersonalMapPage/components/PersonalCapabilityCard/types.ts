import { MapVariant } from 'features/maps';

import { ITechCapability } from 'api/capability/types';
import { IPersonalMapGroup } from 'api/maps/types';

export interface IPersonalCapabilityCard {
    item: IPersonalMapGroup;
    withinGrid?: boolean;
    topLevel?: boolean;
    mapVariant: MapVariant;
    mapTypeId: number;
}

export interface ITechCapabilityCard {
    techCapability: ITechCapability;
}
