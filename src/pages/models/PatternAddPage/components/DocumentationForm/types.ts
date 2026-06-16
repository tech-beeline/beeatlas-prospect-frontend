import { ISavedData, StepVariants } from '../../const';

export interface IDocumentationForm {
    setStepVariant: (stepVariant: StepVariants) => void;
    savedData: ISavedData;
    setSavedData: (savedData: ISavedData) => void;
}
