import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

export interface ICallsContent {
    e2eCodes: string[];
}

export type IE2EOperation = IStagingSequenceCallsData['operations'][number];

export type IE2EOperationRelation = IStagingSequenceCallsData['operationsRelations'][number];
