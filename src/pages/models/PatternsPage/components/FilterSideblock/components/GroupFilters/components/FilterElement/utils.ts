import { IPatternGroupTree } from 'api/patterns/types';

export const getIdsRecursively = (filterElement: IPatternGroupTree): number[] => {
    const ids = [];
    ids.push(filterElement.id);

    for (const c of filterElement.children) {
        ids.push(...getIdsRecursively(c));
    }

    return ids;
};
