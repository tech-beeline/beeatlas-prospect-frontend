import { INestingMenuItem } from 'stores/GeneralStore';

export interface IBreadCrumbsItem {
    item: { id: number; name: string };
    activeFDMItem: INestingMenuItem;
    setActiveFDMItem: (item: INestingMenuItem) => void;
}
