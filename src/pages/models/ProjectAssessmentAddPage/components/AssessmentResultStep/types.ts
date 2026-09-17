import { Dispatch, SetStateAction } from 'react';

import { AssessmentResults, IProjectDto } from 'api/projects/types';

import { IAssessmentFormData } from '../../types';

export interface IAssessmentResultStepProps {
    setSavedData: Dispatch<SetStateAction<IAssessmentFormData>>;
    savedData: IAssessmentFormData;
    project: IProjectDto;
    processState: 'starting' | 'processing' | 'done' | 'error';
    progress: number;
    impactLevel: AssessmentResults;
    onBack: () => void;
}
