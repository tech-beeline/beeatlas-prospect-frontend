import { IBIData } from 'api/bi/types';
import { ICompleteStepData } from 'api/cj/types';

export interface IRow<T> {
    rowId: string;
    label: string;

    formatData: (data: T) => JSX.Element | string;
    onAddButtonClick: (biIndex: number) => void;
    firstRow?: boolean;

    steps: ICompleteStepData[];
    parseData: (bi: IBIData) => T;
}
