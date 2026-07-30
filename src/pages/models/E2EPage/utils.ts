import { IStagingSequenceCJ } from 'api/staging-sequence/types';

import { E2ETreeItemType, IE2ETreeItem } from './types';

export const formatTreeData = (data: IStagingSequenceCJ[] | undefined): IE2ETreeItem[] => {
    if (!data || !Array.isArray(data)) return [];
    return (data ?? []).map((cj) => ({
        id: String(cj.id ?? ''),
        code: cj.uid,
        title: cj.name,
        type: E2ETreeItemType.CJ,
        children: cj.bi.map((bi) => ({
            id: String(bi.id ?? ''),
            code: bi.uid,
            title: bi.name,
            type: E2ETreeItemType.BI,
            cjData: {
                cjId: String(cj.id ?? ''),
                cjCode: cj.uid,
                cjName: cj.name,
            },
            children: bi.biSteps.map((biStep) => ({
                id: String(biStep.uid ?? ''),
                code: biStep.uid,
                e2eCode: biStep.e2eCode,
                title: biStep.name,
                type: E2ETreeItemType.BI_STEP,
                cjData: {
                    cjId: String(cj.id ?? ''),
                    cjCode: cj.uid,
                    cjName: cj.name,
                },
                biData: {
                    biId: String(bi.id ?? ''),
                    biCode: bi.uid,
                    biName: bi.name,
                },
            })),
        })),
    }));
};

export const formatFlatData = (data: IE2ETreeItem[]): IE2ETreeItem[] => {
    return data.flatMap((item) => [
        item,
        ...('children' in item ? formatFlatData(item.children) : []),
    ]);
};
