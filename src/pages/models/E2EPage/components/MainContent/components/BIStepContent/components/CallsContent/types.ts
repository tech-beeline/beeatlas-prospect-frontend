import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

export interface ICallsContent {
    e2eCodes: string[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export type IE2EOperation = IStagingSequenceCallsData['operations'][number];

export type IE2EOperationRelation = IStagingSequenceCallsData['operationsRelations'][number];
