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

export type PageState =
    | 'form'
    | 'processing'
    | 'review'
    | 'applying'
    | 'failed'
    | 'poll-error'
    | 'foreign-run';
export type PollTarget = 'awaiting_review' | 'terminal';

export interface IRequestError {
    activeRunId?: number;
    error?: string;
    errorMessage?: string;
    message?: string;
}
