import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

export type IEditE2ESideblock = {
    isOpen: boolean;
    onClose: () => void;
    data: IStagingSequenceCallsData | undefined;
};
