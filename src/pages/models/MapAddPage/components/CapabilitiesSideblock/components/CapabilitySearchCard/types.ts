import { ISearchResult } from 'api/capability/types';
import { IPersonalMapType } from 'api/maps/types';

export interface ICapabilitySearchCard {
    capability: ISearchResult;
    mapType: IPersonalMapType;
    selectedCapabilitiesIds: number[];
}

export interface ICapabilitySearchCardOverlay {
    capability: ISearchResult;
}
