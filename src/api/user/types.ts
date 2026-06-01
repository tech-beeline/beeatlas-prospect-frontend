export interface IUserInfo {
    id: number;
    permissions: string[];
    productsIds: number[];
    roles: string[];
}

export interface IUsersForm {
    email: string;
    fullName: string;
    idExt: string;
    login: string;
}

export interface IUserCreateResponseData {
    id: number;
    email: string;
    fullName: string;
    idExt: string;
    login: string;
}
