import { Dispatch, SetStateAction } from 'react';

import { IAssessmentFormData } from '../../types';

export interface IRequirementsStepProps {
    savedData: IAssessmentFormData;
    setSavedData: Dispatch<SetStateAction<IAssessmentFormData>>;
    processState: 'starting' | 'processing' | 'done' | 'error';
    progress: number;
    phase?: string;
    processingStartedAt?: number | null;
    onNext: (selectedRequirementIds: string[]) => void;
    onBack: () => void;
    onRestart: () => void;
}
