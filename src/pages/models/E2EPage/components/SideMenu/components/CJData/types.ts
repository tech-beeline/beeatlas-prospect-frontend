import { IE2ETreeItem } from 'pages/models/E2EPage/types';

export interface ICJData {
    activeTreeItem: IE2ETreeItem | null;
    treeData: IE2ETreeItem[];
    flatTreeData: IE2ETreeItem[];
    isLoading: boolean;
}

export enum CJFilterVariants {
    ALL = 'ALL',
    PUBLISHED = 'PUBLISHED',
    DRAFT = 'DRAFT',
}

export const CHIPS = [
    {
        label: 'Все',
        value: CJFilterVariants.ALL,
    },
    {
        label: 'Опубликованные',
        value: CJFilterVariants.PUBLISHED,
    },
    {
        label: 'Не опубликованные',
        value: CJFilterVariants.DRAFT,
    },
];
