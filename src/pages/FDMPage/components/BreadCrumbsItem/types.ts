import { ItemTypes } from 'pages/FDMPage/store/types';

export interface IBreadCrumbsItem {
    id: number;
    type: ItemTypes;
    name: string;
}
