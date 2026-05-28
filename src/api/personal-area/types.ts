export interface IRole {
    id?: string;
    name?: string;
    alias?: string;
    descr?: string;
    default?: boolean;
    deleted?: boolean;
}

export interface IPermission {
    id: number;
    active?: boolean;
    alias?: string;
    descr?: string;
    group?: string;
    name?: string;
}

export interface IProfile {
    email: string;
    full_name: string;
    id: number;
    id_ext: string;
    login: string;
    last_login: string;
    roles: IRole[];
}

export interface IBusinessOwner {
    userName: string;
    fullName: string;
    employeeNumber: string;
    func_manager_employee_number: string;
    email: string;
    beeAtlas: boolean;
    id: number | null;
}

export interface IBusinessOwnerForm {
    login: string;
    fullName: string;
    idExt: string;
    email: string;
}
