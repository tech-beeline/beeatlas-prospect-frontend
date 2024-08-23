import { ISearchResult } from 'api/capability/types';

export interface ICapabilitySearchCard {
    capability: ISearchResult;
    dragged?: boolean;
}

export interface ICapabilitySearchCardOverlay {
    capability: ISearchResult;
}
