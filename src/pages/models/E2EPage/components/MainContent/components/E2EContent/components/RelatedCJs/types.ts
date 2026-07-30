import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

export interface IRelatedCJs {
    data: IStagingSequenceCallsData | undefined;
    isLoading: boolean;
}
