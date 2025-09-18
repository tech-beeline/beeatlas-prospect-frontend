import { SideblockView } from '../../const';

export interface IGroupFilters {
    isAdmin: boolean;
    setSideblockView: (sideblockView: SideblockView) => void;
    onClose: () => void;
}
