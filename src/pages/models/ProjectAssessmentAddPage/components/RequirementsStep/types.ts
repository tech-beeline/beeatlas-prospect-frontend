import { IAssessmentFormData } from '../../types';

export interface IRequirementsStepProps {
    savedData: IAssessmentFormData;
    processState: 'starting' | 'processing' | 'done' | 'error';
    progress: number;
    onNext: () => void;
    onBack: () => void;
    onRestart: () => void;
}
