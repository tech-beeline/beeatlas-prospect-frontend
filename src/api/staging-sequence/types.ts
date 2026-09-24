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
    bDraft: boolean;
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
