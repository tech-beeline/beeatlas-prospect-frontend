import { IBIData } from 'api/bi/types';

export const groupDataByColumns = (bis: IBIData[], columnsLength: number) => {
    const columns: IBIData[][] = Array.from({ length: columnsLength }).map(() => []);

    for (let i = 0; i < bis.length; i++) {
        columns[i % columnsLength].push(bis[i]);
    }

    return columns;
};
