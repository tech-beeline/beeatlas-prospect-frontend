import { IBIData } from 'api/bi/types';
import { ICompleteStepData } from 'api/cj/types';

import { RowIds } from '../../types';

export interface IRow<T> {
    rowId: RowIds;
    label: string;
    bpmn?: boolean;
    formatData: (data: T, onOpen?: (biId: number) => void) => JSX.Element | string;
    onOpenStepFormByBiId?: (biId: number) => void;
    onAddButtonClick: (biIndex: number) => void;
    firstRow?: boolean;
    lastRow?: boolean;
    canEditCJ: boolean;

    steps: ICompleteStepData[];
    parseData: (bi: IBIData) => T;
    collapsedStedIds: number[];

    draft: boolean;
    showShadow: boolean;
    isBiEditable?: (biId: number) => boolean;
}

export enum RowElementType {
    BI = 'BI',
    EMPTY_STEP = 'EMPTY_STEP',
    COLLAPSED_STEP = 'COLLAPSED_STEP',
}

export const UNEDITABLE_CELLS = new Set([
    RowIds.SCENARION_BI,
    RowIds.IDENTIFICATOR,
    RowIds.DOCUMENT,
]);

export type IReducedTableData = (
    | { type: RowElementType.BI; bi: IBIData }
    | { type: RowElementType.EMPTY_STEP; stepIndex: number }
    | { type: RowElementType.COLLAPSED_STEP; biNames: string[] }
)[];
