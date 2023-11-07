import { BI, Step } from 'pages/CJPage/mocks';

export interface IRow<T> {
    rowId: string;
    label: string;
    isHiddenRowsVisible: boolean;
    hiddenRows: string[];
    setHiddenRows: (rowIds: string[]) => void;
    // rowData: T[];
    formatData: (data: T) => JSX.Element | string;
    onAddButtonClick: (biIndex: number) => void;
    firstRow?: boolean;

    //
    steps: Step[];
    parseData: (bi: BI) => T;
}
