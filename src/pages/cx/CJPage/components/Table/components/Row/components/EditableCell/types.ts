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

export const getCellTypeByRowId = (rowId: RowIds): CellEditType => {
    switch (rowId) {
        case RowIds.NAME:
        case RowIds.DOCUMENT:
            return CellEditType.TEXT;

        case RowIds.DESCRIPTION:
        case RowIds.CLIENT_SCENARIO:
        case RowIds.METRICS:
            return CellEditType.TEXTAREA;

        case RowIds.STATUS:
        case RowIds.TYPE:
            return CellEditType.SELECT;

        case RowIds.CHANNEL:
            return CellEditType.MULTISELECT;
        case RowIds.SCENARION_BI:
            return CellEditType.READONLY;

        default:
            return CellEditType.READONLY;
    }
};

export const getFieldNameByRowId = (rowId: RowIds): keyof IBIData => {
    switch (rowId) {
        case RowIds.NAME:
            return 'name';
        case RowIds.DESCRIPTION:
            return 'descr';
        case RowIds.TYPE:
            return 'status';
        case RowIds.STATUS:
            return 'status';
        case RowIds.CLIENT_SCENARIO:
            return 'clientScenario';
        case RowIds.CHANNEL:
            return 'channel';
        case RowIds.DOCUMENT:
            return 'document';
        case RowIds.METRICS:
            return 'metrics';
        default:
            return 'name';
    }
};
