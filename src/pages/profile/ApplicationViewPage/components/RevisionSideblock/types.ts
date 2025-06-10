import { IExtendedApplication } from 'api/applications/types';

export interface ICreateCategorySideblock {
    isOpen: boolean;
    onClose: () => void;
    application: IExtendedApplication;
}
