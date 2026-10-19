import {
    IProjectUsecaseMappingDecision,
    IProjectUsecasePipelineResult,
} from 'api/staging-service/types';

import { CallDecisionType } from '../../types';

export interface ICallDecisionOption {
    type: CallDecisionType;
    title: string;
    description: string;
}

export interface IResultStep {
    isEditing: boolean;
    result: IProjectUsecasePipelineResult;
    savingDecision: boolean;
    applying: boolean;
    cancelling: boolean;
    actionError: string | null;
    onRestart: () => void;
    onApply: (decisions: IProjectUsecaseMappingDecision[]) => void;
}
