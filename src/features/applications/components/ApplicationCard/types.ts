import { IApplication } from 'api/applications/types';

export interface IApplicationCard {
    application: IApplication;
    review?: boolean;
}
