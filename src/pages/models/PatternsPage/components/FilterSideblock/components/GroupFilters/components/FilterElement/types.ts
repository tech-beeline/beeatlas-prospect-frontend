import { IPatternGroupTree } from 'api/patterns/types';

import { SideblockView } from '../../../../const';
import { IPatternGroupToEdit } from '../../../../types';

export interface IFilterElement {
    isAdmin: boolean;
    filterElement: IPatternGroupTree;
    level?: number;
    parentId: number | null;

    setSideblockView: (sideblockView: SideblockView) => void;
    setGroupToDelete: (el: IPatternGroupTree) => void;
    setGroupToEdit: (group: IPatternGroupToEdit) => void;
    onSelect: (ids: number[], checked: boolean) => void;
    selectedGroups: number[];
}
