import { IE2ETreeItem } from '../../types';

export interface ISideMenu {
    activeItem: IE2ETreeItem | null;
    treeData: IE2ETreeItem[];
    flatData: IE2ETreeItem[];
}
