import { ISearchResult } from 'api/capability/types';
import { IPersonalMapType } from 'api/maps/types';

export interface ICapabilitySearchCard {
    capability: ISearchResult;
    mapType: IPersonalMapType;
    dragged?: boolean;
}

export interface ICapabilitySearchCardOverlay {
    capability: ISearchResult;
}
