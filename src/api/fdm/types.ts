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
