import { Dispatch, SetStateAction } from 'react';

import { IAssessmentFormData } from '../../types';

export interface ITechnicalCapabilitiesStepProps {
    savedData: IAssessmentFormData;
    setSavedData: Dispatch<SetStateAction<IAssessmentFormData>>;
    discoveryState: 'starting' | 'processing' | 'done' | 'error';
    discoveryProgress: number;
    catalogState: 'idle' | 'starting' | 'processing' | 'done' | 'error';
    catalogProgress: number;
    onAnalyze: () => void;
    onNext: () => void;
    nextLoading?: boolean;
    onBack: () => void;
    onRestart: () => void;
}
