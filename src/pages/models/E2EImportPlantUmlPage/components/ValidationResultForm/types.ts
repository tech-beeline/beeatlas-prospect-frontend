import { IE2EPlantUmlValidationResult } from 'api/staging-service/types';

export interface IValidationResultForm {
    result: IE2EPlantUmlValidationResult;
    onBack: () => void;
    onSave: () => Promise<void>;
}
