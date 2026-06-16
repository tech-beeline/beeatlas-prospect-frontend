import { IStagingSequenceBiStep } from 'api/staging-sequence/types';

import { IE2ETreeItem } from '../../types';

export interface IMainContent {
    activeTreeItem: IE2ETreeItem | null;
    activeBiStep: IStagingSequenceBiStep | null;
}
