import { IStagingSequenceAlert } from 'api/staging-sequence/types';

import { AlertSource } from '../../const';
import { IAlertImplementations } from '../../types';

export interface ICreateAlertSidebar {
    isOpen: boolean;
    onClose: () => void;
    data?: IStagingSequenceAlert;
    source: AlertSource;
    selectedId: string | null;
    implementations: IAlertImplementations;
    onSaved: (source: AlertSource, implementationId: string) => void;
}
