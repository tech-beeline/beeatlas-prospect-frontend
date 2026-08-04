import { IE2ETreeItem } from 'pages/models/E2EPage/types';

export interface ITreeItem {
    item: IE2ETreeItem;
    level: number;
    activeTreeItem: IE2ETreeItem | null;
    itemToScroll: IE2ETreeItem | null;
    setItemToScroll: (item: IE2ETreeItem | null) => void;
}
