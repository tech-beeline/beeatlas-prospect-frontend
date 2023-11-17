import { IStepWithBIs } from 'api/queries/cj';
// import { Step } from 'pages/CJPage/mocks';

export interface ITable {
    cjId: number;
    tableData: IStepWithBIs[];
    // setTableData: (steps: IStepWithBIs[]) => void;
}
