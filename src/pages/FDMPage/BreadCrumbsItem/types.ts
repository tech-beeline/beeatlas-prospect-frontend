import { INestingMenuItem } from 'stores/GeneralStore';

export interface IBreadCrumbsItem {
    item: INestingMenuItem;
    activeFDMItem: INestingMenuItem;
    setActiveFDMItem: (item: INestingMenuItem) => void;
}
