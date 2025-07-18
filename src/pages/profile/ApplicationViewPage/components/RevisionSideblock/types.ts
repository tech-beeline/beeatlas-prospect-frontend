import { IExtendedApplication } from 'api/applications/types';

export interface IRevisionSideblock {
    isOpen: boolean;
    onClose: () => void;
    application: IExtendedApplication;
}
