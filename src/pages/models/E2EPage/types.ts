export enum E2ETreeItemType {
    CJ = 'CJ',
    BI = 'BI',
    BI_STEP = 'BI_STEP',
}

export interface IE2EBiStepItem {
    id: string;
    code: string;
    title: string;
    type: E2ETreeItemType.BI_STEP;
    cjData: {
        cjId: string;
        cjCode: string;
        cjName: string;
    };
    biData: {
        biId: string;
        biCode: string;
        biName: string;
    };
}

export interface IE2EBiItem {
    id: string;
    code: string;
    title: string;
    type: E2ETreeItemType.BI;
    cjData: {
        cjId: string;
        cjCode: string;
        cjName: string;
    };
    children: IE2EBiStepItem[];
}

export interface IE2ECjItem {
    id: string;
    code: string;
    title: string;
    type: E2ETreeItemType.CJ;
    children: IE2EBiItem[];
}

export type IE2ETreeItem = IE2ECjItem | IE2EBiItem | IE2EBiStepItem;

export enum E2EContentOptions {
    CJ = 'CJ',
    E2E = 'E2E',
}
