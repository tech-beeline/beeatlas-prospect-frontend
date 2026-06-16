import { IStagingSequenceBiStep } from 'api/staging-sequence/types';

export interface IListItem {
    item: IStagingSequenceBiStep;
    activeBiStep: IStagingSequenceBiStep | null;
    itemToScroll: IStagingSequenceBiStep | null;
    setItemToScroll: (item: IStagingSequenceBiStep | null) => void;
}
