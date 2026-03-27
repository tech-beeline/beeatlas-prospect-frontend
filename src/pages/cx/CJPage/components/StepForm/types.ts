import { ICompleteStepData } from 'api/cj/types';

export interface IStepForm {
    productId: string;
    cjId: number;
    isOpen: boolean;
    step: ICompleteStepData;
    draft: boolean;
    bpmn?: boolean;
    onClose: () => void;
    initialBiId?: number;
    initialStage?: Stage;
}

export enum Stage {
    SETTINGS = 'SETTINGS',
    BISEARCH = 'BISEARCH',
    BIVIEW = 'BIVIEW',
    SELECTEDBIVIEW = 'SELECTEDBIVIEW',
    BIEDIT = 'BIEDIT',
    SELECTEDBIEDIT = 'SELECTEDBIEDIT',
    BICREATE = 'BICREATE',
}
