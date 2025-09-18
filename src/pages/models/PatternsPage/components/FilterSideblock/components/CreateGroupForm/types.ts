import { SideblockView } from '../../const';

export interface ICreateGroupForm {
    setSideblockView: (sideblockView: SideblockView) => void;
    onClose: () => void;
}
