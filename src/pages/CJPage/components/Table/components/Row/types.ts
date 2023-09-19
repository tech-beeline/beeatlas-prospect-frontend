export interface IRow<T> {
    rowId: string;
    label: string;
    isHiddenRowsVisible: boolean;
    hiddenRows: string[];
    setHiddenRows: (rowIds: string[]) => void;
    rowData: T[];
    formatData: (data: T) => JSX.Element | string;
}
