import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

export interface ITreeItem {
    id: string;
    name: string;
    children: ITreeItem[];
}

export interface IRootCall {
    id: string;
    operationId: number | null;
    stereotype: string;
    operation: IStagingSequenceCallsData['discoveredOperations'][number] | null;
}
