export interface IStagingSequenceCJ {
    name: string;
    uid: string;
    id: string | number | null;
    bi: {
        name: string;
        uid: string;
        id: string | number | null;
        biSteps: {
            // id: number;
            uid: string;
            // bi_step_id: number;
            name: string;
            e2eCode: string;
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

interface IOperationRelation {
    order: number;
    relatedOperationId: number;
    stereotype: string;
    operationsRelations: IOperationRelation[] | null;
}

export interface IStagingSequenceCallsData {
    e2e: {
        id: number;
        code: string;
        name: string;
        description: string;
        bi_step_code: string;
    };
    operationsRelations: IOperationRelation[];
    operations: IOperation[];
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
