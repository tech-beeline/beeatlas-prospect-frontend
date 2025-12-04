import { SideblockView } from '../../const';
import { IPatternGroupToEdit } from '../../types';

export interface IGroupFilters {
    isAdmin: boolean;
    setSideblockView: (sideblockView: SideblockView) => void;
    setGroupToEdit: (group: IPatternGroupToEdit) => void;
    onClose: () => void;
    onGroupsChange: (groupIds: number[]) => void;
    selectedGroups: number[];
}
