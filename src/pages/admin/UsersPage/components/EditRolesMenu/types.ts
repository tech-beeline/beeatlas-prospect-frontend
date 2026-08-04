import { IRole } from 'api/personal-area/types';

export interface IEditRolesMenu {
    id: number;
    login: string;
    roles: IRole[];
}
