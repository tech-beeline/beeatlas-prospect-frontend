import { FormValues } from 'features/cx/components/BIForm/form';

import { IBIData } from 'api/bi/types';

import { RowIds } from '../../../../types';

export enum CellEditType {
    TEXT = 'TEXT',
    TEXTAREA = 'TEXTAREA',
    SELECT = 'SELECT',
    MULTISELECT = 'MULTISELECT',
    READONLY = 'READONLY',
}

export interface IEditableCellProps {
    rowId: SupportedRowId;
    formatData: React.ReactNode;
    element: IBIData;
    isActive: boolean;
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
};

export const FORM_FIELD_BY_ROW_ID: Partial<Record<RowIds, keyof FormValues>> = {
    [RowIds.NAME]: 'name',
    [RowIds.DESCRIPTION]: 'descr',
    [RowIds.TYPE]: 'type',
    [RowIds.STATUS]: 'status',
    [RowIds.CLIENT_SCENARIO]: 'clientScenario',
    [RowIds.CHANNEL]: 'channels',
    [RowIds.METRICS]: 'metrics',
};

export const formatValueForForm = (rowId: RowIds, value: EditStateValue): any => {
    switch (rowId) {
        case RowIds.STATUS:
        case RowIds.TYPE:
            if (typeof value === 'number') return value;
            if (typeof value === 'string') return Number(value) || 0;
            return 0;

        case RowIds.CHANNEL:
            if (Array.isArray(value)) {
                return value
                    .map((v) => (typeof v === 'number' ? v : Number(v)))
                    .filter((v) => !isNaN(v));
            }
            return [];

        case RowIds.NAME:
        case RowIds.DESCRIPTION:
        case RowIds.CLIENT_SCENARIO:
        case RowIds.METRICS:
            if (typeof value === 'string') return value;
            return String(value ?? '');

        default:
            return value;
    }
};

export const getCellTypeByRowId = (rowId: RowIds): CellEditType => {
    return CELL_TYPE_BY_ROW_ID[rowId] ?? CellEditType.READONLY;
};

export const getFieldNameByRowId = (rowId: RowIds): keyof IBIData => {
    return FIELD_NAME_BY_ROW_ID[rowId] ?? 'name';
};

export type SupportedRowId = keyof typeof FIELD_NAME_BY_ROW_ID & keyof typeof CELL_TYPE_BY_ROW_ID;

export type EditStateValue = string | number | number[] | boolean | null;

export type OnChangeOption = { id: string; value: string };
