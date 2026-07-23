import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

export interface ICallsContent {
    data: IStagingSequenceCallsData | undefined;
    isLoading: boolean;
}

export interface ITreeItem {
    id: string;
    name: string;
    children: ITreeItem[];
}
