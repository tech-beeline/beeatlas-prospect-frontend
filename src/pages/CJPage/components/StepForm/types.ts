import { ICompleteStepData } from 'api/cj/types';

export interface IStepForm {
    cjId: number;
    isOpen: boolean;
    step: ICompleteStepData;
    onClose: () => void;
}

export enum Stage {
    SETTINGS = 'SETTINGS',
    BISEARCH = 'BISEARCH',
    BIVIEW = 'BIVIEW',
    SELECTEDBIVIEW = 'SELECTEDBIVIEW',
    BIEDIT = 'BIEDIT',
    BICREATE = 'BICREATE',
}
