import { ICJNewData } from 'api/cj/types';

export interface IRow {
    cj: ICJNewData;
    showShadow: boolean;
    isActive?: boolean;
    onMenuToggle?: (id: number | null) => void;
}
