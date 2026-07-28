import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

import { TabVariants } from './const';

export const formatTabLabel = (
    tabVariant: TabVariants,
    data: IStagingSequenceCallsData | undefined,
) => {
    switch (tabVariant) {
        case TabVariants.CALLS:
            return 'Последовательность вызовов';
        case TabVariants.RELATED_CJS:
            // return data?.cj ? `Связанные CJ (${data.cj.length})` : 'Связанные CJ';
            return 'Связанные CJ';
    }
};
