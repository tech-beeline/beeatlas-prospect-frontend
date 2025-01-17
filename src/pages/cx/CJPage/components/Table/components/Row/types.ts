import { IBIData } from 'api/bi/types';
import { ICompleteStepData } from 'api/cj/types';

import { RowIds } from '../../types';

export interface IRow<T> {
    rowId: RowIds;
    label: string;

    formatData: (data: T) => JSX.Element | string;
    onAddButtonClick: (biIndex: number) => void;
    firstRow?: boolean;
    lastRow?: boolean;

    steps: ICompleteStepData[];
    parseData: (bi: IBIData) => T;
    collapsedStedIds: number[];

    draft: boolean;
    showShadow: boolean;
}

export enum RowElementType {
    BI = 'BI',
    EMPTY_STEP = 'EMPTY_STEP',
    COLLAPSED_STEP = 'COLLAPSED_STEP',
}

export type IReducedTableData = (
    | { type: RowElementType.BI; bi: IBIData }
    | { type: RowElementType.EMPTY_STEP; stepIndex: number }
    | { type: RowElementType.COLLAPSED_STEP; biNames: string[] }
)[];
