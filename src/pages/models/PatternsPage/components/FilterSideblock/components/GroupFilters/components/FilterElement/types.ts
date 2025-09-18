import { IFilterElementWithChildren, SideblockView } from '../../../../const';

export interface IFilterElement {
    isAdmin: boolean;
    filterElement: IFilterElementWithChildren;
    level?: number;

    setSideblockView: (sideblockView: SideblockView) => void;
    setGroupToDelete: (el: IFilterElementWithChildren) => void;
}
