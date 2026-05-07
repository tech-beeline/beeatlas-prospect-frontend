import { IE2ETreeItem } from '../../../../types';

export interface ITreeItem {
    item: IE2ETreeItem;
    level: number;
    activeItem: IE2ETreeItem | null;
}
