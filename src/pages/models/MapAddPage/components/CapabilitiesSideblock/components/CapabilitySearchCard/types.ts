import { ISearchResult } from 'api/capability/types';

export interface ICapabilitySearchCard {
    capability: ISearchResult;
    mapTypeId: number;
    dragged?: boolean;
}

export interface ICapabilitySearchCardOverlay {
    capability: ISearchResult;
}
