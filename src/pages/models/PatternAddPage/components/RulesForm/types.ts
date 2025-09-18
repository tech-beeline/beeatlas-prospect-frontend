import { ISavedData, StepVariants } from '../../const';

export interface IRulesForm {
    setStepVariant: (stepVariant: StepVariants) => void;
    savedData: ISavedData;
    setSavedData: (savedData: ISavedData) => void;
}
