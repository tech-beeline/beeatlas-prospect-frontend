import { IStagingSequenceAlert } from 'api/staging-sequence/types';

export interface ICreateAlertSidebar {
    isOpen: boolean;
    onClose: () => void;
    data?: IStagingSequenceAlert;
    code: string;
}
