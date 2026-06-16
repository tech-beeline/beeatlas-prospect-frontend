import { ItemTypes } from 'pages/models/FDMPage/store/types';

export interface IBreadCrumbsItem {
    id: number;
    type: ItemTypes;
    name: string;
}
