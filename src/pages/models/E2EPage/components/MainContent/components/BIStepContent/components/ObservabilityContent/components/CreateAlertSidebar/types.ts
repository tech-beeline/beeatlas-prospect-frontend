import { IStagingSequenceAlert } from 'api/staging-sequence/types';

export interface ICreateAlertSidebar {
    isOpen: boolean;
    onClose: () => void;
    data?: IStagingSequenceAlert;
    selectedE2ECode: string | null;
    e2eCodes: string[];
    onSaved: (e2eCode: string) => void;
}
