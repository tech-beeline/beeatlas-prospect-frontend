import { IProfile } from 'api/personal-area/types';

export interface IEmployeeField {
    index: number;
    remove: (index: number) => void;
    usersData: IProfile[];
    disabled: boolean;
    isOwner?: boolean;
    length: number;
}
