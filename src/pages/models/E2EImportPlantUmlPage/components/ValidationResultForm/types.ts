import { IE2EPlantUmlPipelineResult } from 'api/staging-service/types';

export interface IValidationResultForm {
    result: IE2EPlantUmlPipelineResult;
    isSaving: boolean;
    isDeclining: boolean;
    actionError: string | null;
    onCancel: () => Promise<void>;
    onSave: () => Promise<void>;
    onRetryAction: () => Promise<void>;
}
