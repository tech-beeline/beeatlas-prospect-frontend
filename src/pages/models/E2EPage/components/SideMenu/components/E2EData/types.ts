import { IStagingSequenceBiStep } from 'api/staging-sequence/types';

export interface IE2EData {
    activeBiStep: IStagingSequenceBiStep | null;
    biSteps: IStagingSequenceBiStep[];
    isLoading: boolean;
}
