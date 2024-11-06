export interface ICapability {
    alias: string;
    author: string;
    descr: string;
    domain_ref: {
        descr: string;
        guid: string;
        id: number;
        name: string;
    };
    guid: string;
    id: number;
    last_modified: string;
    name: string;
    owner: string;
    status: string;
    stereotype: string;
}

export interface ICapabilityProduct {
    alias: string;
    eaGuid: string;
    name: string;
}

export interface IBusinessCapability {
    id: number;
    code: string;
    name: string;
    description: string;
    author: string;
    link: string;
    createdDate: string;
    deletedDate: string | null;
    owner: number;
    hasChildren: boolean;
    parent: Omit<IBusinessCapability, 'parent'> | null;
    isDomain: boolean;
    updatedDate: string;
}

export interface ITechCapability {
    id: number;
    code: string;
    name: string;
    description: string;
    author: string;
    link: string;
    createdDate: string;
    deletedDate: string | null;
    owner: number;
    parents: Array<Omit<IBusinessCapability, 'parent'>>;
    updatedDate: string;
}

export interface ITechCapability {
    id: number;
    code: string;
    name: string;
    description: string;
    author: string;
    link: string;
    createdDate: string;
    deletedDate: string | null;
    owner: number;
    parents: Omit<IBusinessCapability, 'parent'>[];
    updatedDate: string;
}

export interface IParentsData {
    parents: number[];
}

export enum CapabilitySearchVariant {
    ALL = 'ALL',
    BUSINESS_CAPABILITY = 'BUSINESS_CAPABILITY',
    TECH_CAPABILITY = 'TECH_CAPABILITY',
}

export enum CapabilitySearchResultTypeVariant {
    BUSINESS_CAPABILITY = 'BUSINESS_CAPABILITY',
    TECH_CAPABILITY = 'TECH_CAPABILITY',
}

export interface ISearchResult {
    code: string;
    description: string;
    id: number;
    name: string;
    type: CapabilitySearchResultTypeVariant;
}

export interface ISubscribedCapabilityData {
    code: string;
    description: string;
    id: number;
    isDomain: boolean;
    name: string;
    owner: string;
    parentId: number;
}

export interface IBusinessCapabilityForm {
    parent: string;
    name: string;
    description: string;
    owner: string;
    link: string;
    author: string;
}

interface ICriteria {
    criterion_id: number;
    grade: number;
    value: number;
}

export interface IMapItemData {
    author: string;
    children: IMapItemData[];
    code: string;
    createdDate: Date;
    criteria: ICriteria[];
    description: string;
    id: number;
    isDomain: boolean;
    link: string;
    name: string;
    owner: string;
    status: string;
    updatedDate: Date;
    parent?: { id: number; name: string }[];
}
