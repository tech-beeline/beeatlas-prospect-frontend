import { IProjectUsecasePipelineConnectionOperation } from 'api/staging-service/types';

export enum UsecaseImportStep {
    DATA = 'DATA',
    RESULT = 'RESULT',
}

export enum CallDecisionType {
    EXISTING = 'EXISTING',
    EXISTS_UNSPECIFIED = 'EXISTS_UNSPECIFIED',
    DEVELOP = 'DEVELOP',
    NOT_A_CALL = 'NOT_A_CALL',
}

export interface IResolutionDraft {
    type: CallDecisionType | null;
    productAlias: string | null;
    connectionOperation: IProjectUsecasePipelineConnectionOperation | null;
    requirements: string;
}
