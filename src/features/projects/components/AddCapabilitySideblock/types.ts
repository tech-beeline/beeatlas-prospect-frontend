import { CapabilitySearchVariant, ISearchResult } from 'api/capability/types';

export type AddCapabilityType =
    | CapabilitySearchVariant.BUSINESS_CAPABILITY
    | CapabilitySearchVariant.TECH_CAPABILITY;

export interface IAddCapabilitySideblockProps {
    isOpen: boolean;
    capabilityType: AddCapabilityType;
    excludedCapabilityCodes: string[];
    onAdd: (capabilities: ISearchResult[]) => void;
    onClose: () => void;
}
