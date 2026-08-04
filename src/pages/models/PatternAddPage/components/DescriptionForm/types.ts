import { ISavedData, StepVariants } from '../../const';

export interface IDescriptionForm {
    setStepVariant: (stepVariant: StepVariants) => void;
    savedData: ISavedData;
    setSavedData: (savedData: ISavedData) => void;
}
