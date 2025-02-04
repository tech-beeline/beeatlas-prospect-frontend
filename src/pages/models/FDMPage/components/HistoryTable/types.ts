import { TabVariant } from '../../const';
import { ItemTypes } from '../../store/types';

export interface IHistoryTable {
    capabilityId: number;
    capabilityType: ItemTypes;
    setTabVariant: (tabVariant: TabVariant) => void;
}
