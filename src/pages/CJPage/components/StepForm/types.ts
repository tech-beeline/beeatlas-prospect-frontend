import { IStepWithBIs } from 'api/queries/cj';
export interface IStepForm {
    cjId: number;
    isOpen: boolean;
    step: IStepWithBIs;
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
