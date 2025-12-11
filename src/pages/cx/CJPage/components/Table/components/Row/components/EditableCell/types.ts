import { IBIData } from 'api/bi/types';

import { RowIds } from '../../../../types';

export enum CellEditType {
    TEXT = 'TEXT',
    TEXTAREA = 'TEXTAREA',
    SELECT = 'SELECT',
    MULTISELECT = 'MULTISELECT',
    READONLY = 'READONLY',
}

export interface IEditableCellProps<T> {
    rowId: RowIds;
    formatData: React.ReactNode;
    element: IBIData;
    isEditing: boolean;
    onEndEdit?: () => void;
}

const CELL_TYPE_BY_ROW_ID: Partial<Record<RowIds, CellEditType>> = {
    [RowIds.NAME]: CellEditType.TEXT,
    [RowIds.DOCUMENT]: CellEditType.READONLY,
    [RowIds.DESCRIPTION]: CellEditType.TEXTAREA,
    [RowIds.CLIENT_SCENARIO]: CellEditType.TEXTAREA,
    [RowIds.METRICS]: CellEditType.TEXTAREA,
    [RowIds.STATUS]: CellEditType.SELECT,
    [RowIds.TYPE]: CellEditType.SELECT,
    [RowIds.CHANNEL]: CellEditType.MULTISELECT,
    [RowIds.SCENARION_BI]: CellEditType.READONLY,
};

const FIELD_NAME_BY_ROW_ID: Partial<Record<RowIds, keyof IBIData>> = {
    [RowIds.NAME]: 'name',
    [RowIds.DESCRIPTION]: 'descr',
    [RowIds.TYPE]: 'target',
    [RowIds.STATUS]: 'status',
    [RowIds.CLIENT_SCENARIO]: 'clientScenario',
    [RowIds.CHANNEL]: 'channel',
    [RowIds.DOCUMENT]: 'document',
    [RowIds.METRICS]: 'metrics',
    [RowIds.SCENARION_BI]: 'name',
};

export const getCellTypeByRowId = (rowId: RowIds): CellEditType => {
    return CELL_TYPE_BY_ROW_ID[rowId] ?? CellEditType.READONLY;
};

export const getFieldNameByRowId = (rowId: RowIds): keyof IBIData => {
    return FIELD_NAME_BY_ROW_ID[rowId] ?? 'name';
};
