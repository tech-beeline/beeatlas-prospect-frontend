import { INestingMenuItem } from 'stores/FDMStore';

export interface IBreadCrumbsItem {
    item: INestingMenuItem;
    activeFDMItem: INestingMenuItem;
    setActiveFDMItem: (item: INestingMenuItem) => void;
}
