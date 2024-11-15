import {
    CapabilitySearchResultTypeVariant,
    IBusinessCapability,
    ITechCapability,
} from 'api/capability/types';

type TreeCapability =
    | {
          type: CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY;
          capability: IBusinessCapability;
      }
    | {
          type: CapabilitySearchResultTypeVariant.TECH_CAPABILITY;
          capability: ITechCapability;
      };

export type ICapabilityTreeCard = TreeCapability & {
    level: number;
    mapTypeId: number;
};
