import { ISavedData, StepVariants } from '../../const';

export interface IGeneralInfoForm {
    setStepVariant: (stepVariant: StepVariants) => void;
    savedData: ISavedData;
    setSavedData: (savedData: ISavedData) => void;
}
