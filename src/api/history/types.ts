export interface ICapabilityVersionInfo {
    version_info: {
        version: number;
        modified_date: Date;
        author: string;
    };
}

export interface IBusinessCapabilityVersion {
    capability: {
        id: number;
        code: string;
        name: string;
        description: string;
        owner: string;
        modifiedDate: Date;
        deletedDate: Date;
        status: string;
        parent: {
            id: number;
            code: string;
            name: string;
        };
        author: string;
        link: string;
        version: number;
        is_domain: false;
    };
}

export interface ITechCapabilityVersion {
    tech_capability: {
        id: number;
        code: string;
        name: string;
        description: string;
        owner: string;
        modifiedDate: Date;
        deletedDate: Date;
        status: string;
        parents: {
            id: number;
            code: string;
            name: string;
        }[];
        author: string;
        link: string;
        version: number;
        is_domain: false;
    };
}
