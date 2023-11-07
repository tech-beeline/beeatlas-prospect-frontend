import { BI, Step } from 'pages/CJPage/mocks';
export interface IStepForm {
    cjId: number;
    isOpen: boolean;
    defaultName: string;
    step: Step;
    onClose: () => void;
    updateStep: (name: string, BIs: BI[]) => void;
    initialBIs: BI[];
}

export enum Stage {
    SETTINGS = 'SETTINGS',
    BISEARCH = 'BISEARCH',
    BIVIEW = 'BIVIEW',
    SELECTEDBIVIEW = 'SELECTEDBIVIEW',
    BIEDIT = 'BIEDIT',
    BICREATE = 'BICREATE',
}
