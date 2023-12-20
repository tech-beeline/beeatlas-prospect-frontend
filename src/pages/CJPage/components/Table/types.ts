import { ICompleteStepData } from 'api/cj/types';

export interface ITable {
    productId: string;
    cjId: number;
    draft: boolean;
    tableData: ICompleteStepData[];
}
