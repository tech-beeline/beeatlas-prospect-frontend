import { IProfile } from 'api/personal-area/types';

export interface IEmployeeField {
    index: number;
    append: (e: { employee: undefined }) => void;
    remove: (index: number) => void;
    usersData: IProfile[];
    disabled: boolean;
    isOwner?: boolean;
}
