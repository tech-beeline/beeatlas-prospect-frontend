import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

export interface ITreeItem {
    id: string;
    name: string;
    children: ITreeItem[];
}

export interface IRootCall {
    id: string;
    stereotype: string;
    operation: IStagingSequenceCallsData['operations'][number] | null;
}
