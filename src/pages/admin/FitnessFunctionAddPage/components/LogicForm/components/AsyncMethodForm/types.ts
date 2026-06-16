import { StepVariants } from '../../../../const';
import { IFitnessFunctionSavedData } from '../../../../types';

export interface IAsyncMethodForm {
    setStepVariant: (stepVariant: StepVariants) => void;
    savedData: IFitnessFunctionSavedData;
    setSavedData: (savedData: IFitnessFunctionSavedData) => void;
}
