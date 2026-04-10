import { INonFunctionalRequirement } from 'api/product/types';

export const groupDataByColumns = (nfr: INonFunctionalRequirement[], columnsLength = 2) => {
    const columns: INonFunctionalRequirement[][] = Array.from({ length: columnsLength }).map(
        () => [],
    );

    for (let i = 0; i < nfr.length; i++) {
        columns[i % columnsLength].push(nfr[i]);
    }

    return columns;
};
