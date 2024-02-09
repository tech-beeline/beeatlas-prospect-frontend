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
