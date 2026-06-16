import { IBusinessCapability } from 'api/capability/types';

export interface ICapabilityAutocomplete {
    isLoadingCapability: boolean;
    parent?: Omit<IBusinessCapability, 'parent'> | null;
}
