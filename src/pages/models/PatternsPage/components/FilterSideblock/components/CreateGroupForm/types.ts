import { SideblockView } from '../../const';
import { IPatternGroupToEdit } from '../../types';

export interface ICreateGroupForm {
    setSideblockView: (sideblockView: SideblockView) => void;
    groupToEdit: IPatternGroupToEdit | null;
    setGroupToEdit: (group: null) => void;
    onClose: () => void;
}
