import { ICompleteStepData } from 'api/cj/types';

export interface ITable {
    cjId: number;
    draft: boolean;
    tableData: ICompleteStepData[];
}
