import { ISavedData, StepVariants } from '../../const';

export interface INFRForm {
    setStepVariant: (stepVariant: StepVariants) => void;
    savedData: ISavedData;
    setSavedData: (savedData: ISavedData) => void;
}
