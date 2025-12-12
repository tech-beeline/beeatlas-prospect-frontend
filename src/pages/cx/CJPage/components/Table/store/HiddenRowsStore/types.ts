import { RowIds } from '../../types';

export interface IHiddenRowsStore {
    hiddenRows: RowIds[];
    showHiddenRows: boolean;

    setHiddenRows: (rowIds: RowIds[]) => void;
    setShowHiddenRows: (flag: boolean) => void;
}
