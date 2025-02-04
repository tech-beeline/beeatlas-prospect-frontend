import { ICJData } from 'api/cj/types';

export const groupDataByColumns = (bis: ICJData[], columnsLength: number) => {
    const columns: ICJData[][] = Array.from({ length: columnsLength }).map(() => []);

    for (let i = 0; i < bis.length; i++) {
        columns[i % columnsLength].push(bis[i]);
    }

    return columns;
};
