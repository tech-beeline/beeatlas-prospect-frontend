import {
    CapabilitySearchResultTypeVariant,
    IBusinessCapability,
    ITechCapability,
} from 'api/capability/types';
import { IPersonalMapType } from 'api/maps/types';

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
    selectedCapabilitiesIds: number[];
    mapType: IPersonalMapType;
};
