import { IBIData } from 'api/bi/types';
import { IStepWithBIs } from 'api/queries/cj';
// import { BI } from 'pages/CJPage/mocks';

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
    steps: IStepWithBIs[];
    parseData: (bi: IBIData) => T;
}
