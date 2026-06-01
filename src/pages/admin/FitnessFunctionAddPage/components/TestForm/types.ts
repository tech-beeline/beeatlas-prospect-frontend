import { StepVariants } from '../../const';
import { IFitnessFunctionSavedData } from '../../types';

export interface ITestForm {
    setStepVariant: (stepVariant: StepVariants) => void;
    savedData: IFitnessFunctionSavedData;
    setSavedData: (savedData: IFitnessFunctionSavedData) => void;
    paramId: string | null;
}
