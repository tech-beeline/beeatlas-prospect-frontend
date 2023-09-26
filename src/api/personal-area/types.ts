export interface IRole {
    id?: string;
    name?: string;
    alias?: string;
    descr?: string;
}

export interface IPermission {
    id: number;
    active?: boolean;
    alias?: string;
    descr?: string;
    group?: string;
    name?: string;
}
