export interface IStagingSequenceCJ {
    name: string;
    uid: string;
    id: string | number | null;
    bi: {
        name: string;
        uid: string;
        id: string | number | null;
        bi_steps: {
            id: number;
            uid: string;
            bi_step_id: number;
            name: string;
        }[];
    }[];
}

export interface IStagingSequenceBiStep {
    id: number;
    uid: string;
    bi_step_id: number;
    bi_ref_id: number;
    name: string;
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

export interface IStagingSequenceCallsData {
    id: number;
    uid: string;
    bi_uid: string;
    cj_uid: string;
    bi_step_uid: string;
    cj: { id: number; name: string; cj_uid: string }[];
    bi_step_relations: {
        id: number;
        call_order: number;
        operation_ref_id: number;
        stereotype: string;
    }[];
    operation_relations: {
        id: number;
        operation_ref_id: number;
        call_order: number;
        related_operation_ref_id: number;
        stereotype: string;
    }[];
    operation_refs: {
        id: number;
        operation_id: number;
        uid: string;
        name: string;
        interface_code: string;
        container_code: string;
        product_code: string;
        rps: number;
        latency: number;
        error_rate: number;
    }[];
}
