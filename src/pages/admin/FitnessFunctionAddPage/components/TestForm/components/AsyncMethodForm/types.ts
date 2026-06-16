import { StepVariants } from 'pages/admin/FitnessFunctionAddPage/const';
import { IFitnessFunctionSavedData } from 'pages/admin/FitnessFunctionAddPage/types';

export interface IAsyncMethodForm {
    setStepVariant: (stepVariant: StepVariants) => void;
    savedData: IFitnessFunctionSavedData;
    setSavedData: (savedData: IFitnessFunctionSavedData) => void;
}

export interface IProductOption {
    id: number;
    value: string;
    alias: string;
}
