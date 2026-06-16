import { StepVariants } from 'pages/admin/FitnessFunctionAddPage/const';
import { IFitnessFunctionSavedData } from 'pages/admin/FitnessFunctionAddPage/types';

export interface IScriptForm {
    setStepVariant: (stepVariant: StepVariants) => void;
    savedData: IFitnessFunctionSavedData;
    setSavedData: (savedData: IFitnessFunctionSavedData) => void;
    paramId: string | null;
}

export interface IProductOption {
    id: number;
    value: string;
    alias: string;
}
