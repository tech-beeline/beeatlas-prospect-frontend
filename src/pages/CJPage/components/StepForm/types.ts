import { BI } from 'pages/CJPage/mocks';
export interface IStepForm {
    isOpen: boolean;
    defaultName: string;
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
