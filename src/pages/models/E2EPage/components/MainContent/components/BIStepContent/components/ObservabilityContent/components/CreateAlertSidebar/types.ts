import { IStagingSequenceAlert } from 'api/staging-sequence/types';

import { AlertSource, PublishTarget } from '../../const';
import { IAlertImplementations } from '../../types';

export interface ICreateAlertSidebar {
    isOpen: boolean;
    onClose: () => void;
    target: PublishTarget;
    data?: IStagingSequenceAlert;
    source: AlertSource;
    selectedId: string | null;
    implementations: IAlertImplementations;
}
