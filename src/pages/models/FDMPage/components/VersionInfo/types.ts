import { TabVariant } from '../../const';
import { ItemTypes } from '../../store/types';

export interface IVersionInfo {
    capabilityId: string;
    capabilityType: ItemTypes;
    versionId: number;
    setTabVariant: (tabVariant: TabVariant) => void;
}
