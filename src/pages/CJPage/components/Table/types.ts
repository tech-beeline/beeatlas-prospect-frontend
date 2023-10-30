import { Step } from 'pages/CJPage/mocks';

export interface ITable {
    cjId: number;
    tableData: Step[];
    setTableData: (steps: Step[]) => void;
}
