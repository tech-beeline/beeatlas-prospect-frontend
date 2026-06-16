import { IFitnessFunctionData } from 'api/fitness-functions/types';

import { StepVariants } from '../../const';
import { IFitnessFunctionSavedData } from '../../types';

export interface IGeneralInfoForm {
    setStepVariant: (stepVariant: StepVariants) => void;
    savedData: IFitnessFunctionSavedData;
    setSavedData: (savedData: IFitnessFunctionSavedData) => void;
    paramId: string | null;
    fitnessFunctions: IFitnessFunctionData[] | undefined;
    isLoadingFitnessFunctions: boolean;
}

export interface IFitnessFunctionOption {
    id: string;
    value: string;
    description: string;
}
