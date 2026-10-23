import { IStagingSequenceBiStepData } from 'api/staging-sequence/types';
import { IProjectUsecaseDetails, IProjectUsecaseOperationsViewData } from 'api/usecase/types';

export interface ExportButtonProps {
    usecase: IProjectUsecaseDetails;
    data?: IProjectUsecaseOperationsViewData;
    relations?: IStagingSequenceBiStepData;
}
