import { Step } from 'pages/CJPage/mocks';

export interface ITable {
    tableData: Step[];
    setTableData: (steps: Step[]) => void;
}
