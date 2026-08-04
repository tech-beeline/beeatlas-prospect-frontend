import { IStagingSequenceBiStep } from 'api/staging-sequence/types';

import { IE2ETreeItem } from '../../types';

export interface ISideMenu {
    activeTreeItem: IE2ETreeItem | null;
    activeBiStep: IStagingSequenceBiStep | null;
    treeData: IE2ETreeItem[];
    flatTreeData: IE2ETreeItem[];
    biSteps: IStagingSequenceBiStep[];
    isLoading: boolean;
}
