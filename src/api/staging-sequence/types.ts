export interface IStagingSequenceCJ {
    name: string;
    uid: string;
    id: string | number | null;
    bi: {
        name: string;
        uid: string;
        id: string | number | null;
        biSteps: {
            uid: string;
            name: string;
            e2eCodes: string[];
        }[];
    }[];
}

export interface IStagingSequenceBiStep {
    id: number;
    code: string;
    name: string;
    description: string | null;
    biStepCode: string | null;
}

export interface IStagingSequenceAlert {
    id: number;
    uid: string;
    name: string;
    version: number;
    template_id: number;
    status: string;
    created: string;
    creator: string;
    note: string;
}

export interface IStagingSequenceAlertForm {
    creator: string;
    note: string;
}

export interface IDashboardVersionStatus extends IStagingSequenceAlert {
    sourceUid: string | null;
    url: string | null;
}

export interface IPipelineRunForm {
    uid: string;
    folder_uid?: string;
    message?: string;
    creator?: string;
}

export type PipelineRunStatus = 'in_progress' | 'success' | 'failed' | 'partial';

export interface IPipelineStageRun {
    stage_code: string;
    status: PipelineRunStatus;
    started_at: string;
    finished_at: string | null;
    error_message: string | null;
}

interface IPipelineRunContext {
    uid: string;
    template_id: number;
    folder_uid?: string;
    message?: string;
    dashboard_type?: string;
}

interface IPipelineRunResult {
    success: boolean;
    target_ref: string;
    message: string | null;
}

export interface IPipelineRun {
    id: number;
    pipeline_code: string;
    status: PipelineRunStatus;
    trigger: string;
    started_at: string;
    finished_at: string | null;
    context: IPipelineRunContext;
    stage_runs: IPipelineStageRun[];
    result: IPipelineRunResult;
}

export interface IDashboardVersion {
    id: number;
    dashboard_type: string;
    uid: string;
    template_id: number;
    name: string;
    version: number;
    status: string;
    created: string;
    creator: string | null;
    note: string | null;
    url?: string | null;
}

export interface IDashboardVersionRun {
    id: number | null;
    pipeline_code: string;
    status: PipelineRunStatus | null;
    trigger: string | null;
    started_at: string | null;
    finished_at: string | null;
    context: IPipelineRunContext | null;
    stage_runs: IPipelineStageRun[];
    result: IPipelineRunResult | null;
    dashboard_version: IDashboardVersion;
}

interface IOperation {
    id: number;
    name: string;
    type: string;
    interfaceCode: string;
    containerCode: string;
    productAlias: string;
    sla: {
        latency: number;
        errorRate: number;
        rps: number;
    } | null;
    operation?: { id: number; name: string; type: string } | null;
}

export enum EntityRelationType {
    OPERATION = 'operation',
    DISCOVERED_OPERATION = 'discovered_operation',
}

interface IOperationRelation {
    order: number;
    relatedOperationId: number;
    stereotype: string;
    entityTypeRelatedOperation: EntityRelationType;
    operationsRelations: IOperationRelation[] | null;
}

export interface IStagingSequenceCallsData {
    e2e: {
        id: number;
        code: string;
        name: string;
        description: string;
        biStepCode: string;
        source: string;
    };
    operationsRelations: IOperationRelation[];
    operations: IOperation[];
    discoveredOperations: IOperation[];
}

export interface IStagingSequenceEntity {
    id: number;
    uid: string;
    name: string;
}

export interface IStagingSequenceRelatedCJ {
    id: number;
    uid: string;
    name: string;
    bdraft: boolean;
}

export interface IStagingSequenceBiStepData {
    biStep: IStagingSequenceEntity;
    bi: IStagingSequenceEntity;
    cj: IStagingSequenceRelatedCJ[];
}

export interface IPostE2EForm {
    e2e: {
        uid: string;
        name: string;
        description: string;
        biStepCode: string;
    };
    operationsRelations: {
        operationVersionId: number;
        relatedOperationVersionId: number;
        operationId: string;
        relatedOperationId: string;
        order: number;
        stereoType: string;
    }[];
    operations?: unknown[];
    interfaces?: unknown[];
    containers?: unknown[];
    products?: unknown[];
}

export interface IPatchE2EForm {
    name: string;
    biStepCode: string;
}
