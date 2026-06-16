import { IPattern } from 'api/patterns/types';

export const groupDataByColumns = (patterns: IPattern[], columnsLength = 2) => {
    const columns: IPattern[][] = Array.from({ length: columnsLength }).map(() => []);

    for (let i = 0; i < patterns.length; i++) {
        columns[i % columnsLength].push(patterns[i]);
    }

    return columns;
};
