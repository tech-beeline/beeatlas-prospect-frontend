import { Item, ItemTypes } from 'pages/models/FDMPage/store/types';

export type ItemToScroll = { id: number; type: ItemTypes } | null;

export interface IItem {
    item: Item;
    itemToScroll: ItemToScroll;
    setItemToScroll: (item: ItemToScroll) => void;
}
