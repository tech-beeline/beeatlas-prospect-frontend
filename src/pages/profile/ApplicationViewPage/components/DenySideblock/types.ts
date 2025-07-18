import { IExtendedApplication } from 'api/applications/types';

export interface IDenySideblock {
    isOpen: boolean;
    onClose: () => void;
    application: IExtendedApplication;
}
