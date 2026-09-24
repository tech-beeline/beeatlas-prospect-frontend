import { Dispatch, SetStateAction } from 'react';

import { IAssessmentFormData } from '../../types';

export interface ITechnicalCapabilitiesStepProps {
    savedData: IAssessmentFormData;
    setSavedData: Dispatch<SetStateAction<IAssessmentFormData>>;
    discoveryState: 'starting' | 'processing' | 'done' | 'error';
    discoveryProgress: number;
    discoveryStartedAt?: number | null;
    catalogState: 'idle' | 'starting' | 'processing' | 'done' | 'error';
    catalogProgress: number;
    catalogStartedAt?: number | null;
    onAnalyze: () => void;
    onNext: () => void;
    nextLoading?: boolean;
    onBack: () => void;
    onRestart: () => void;
}
