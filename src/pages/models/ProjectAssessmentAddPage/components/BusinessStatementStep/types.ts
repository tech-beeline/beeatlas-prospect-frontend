import { Dispatch, SetStateAction } from 'react';

import { IAssessmentFormData } from '../../types';

export interface IBusinessStatementStepProps {
    savedData: IAssessmentFormData;
    setSavedData: Dispatch<SetStateAction<IAssessmentFormData>>;
    onNext: () => void;
}
