import { ICJNewData } from 'api/cj/types';

export const groupDataByColumns = (bis: ICJNewData[], columnsLength: number) => {
    const columns: ICJNewData[][] = Array.from({ length: columnsLength }).map(() => []);

    for (let i = 0; i < bis.length; i++) {
        columns[i % columnsLength].push(bis[i]);
    }

    return columns;
};
