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
    owner: string | null;
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
    owner: string | null;
    parents: Array<Omit<IBusinessCapability, 'parent'>>;
    updatedDate: string;
    system: ISystem;
    criteria: ICriteria[];
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

export interface ISystem {
    alias: string;
    id: string;
    name: string;
    struturizrURL: string;
}

export interface ICriteria {
    // @TODO: fix
    criterion_id: number;
    criteria_id: number;
    grade: number;
    value: number;
    comment: null | string;
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
    parent?: { id: number; name: string; isDomain: boolean }[];
}

export interface IPromtData {
    alias: string;
    id: number;
    model: string;
    promt: string;
}

export interface IGenerationForm {
    messages: [
        {
            role: 'user';
            content: string;
        },
    ];
    model: string;
    stream: boolean;
}

export interface IGenerationData {
    choices: [
        {
            message: {
                role: string;
                content: string;
            };
        },
    ];
}

export interface ITechCapabilitiesByProductData {
    implemented: {
        code: string;
        description: string;
        id: number;
        name: string;
    }[];
    responsibility: {
        code: string;
        description: string;
        id: number;
        name: string;
    }[];
}
