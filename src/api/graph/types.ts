export interface ISearchSystem {
    cmdb: string;
    name: string;
}

export interface ISearchDeployment {
    id: number;
    deploymentName: string;
    cmdb: string;
    environmentName: string;
    ip: string | null;
    host: string | null;
}

export interface ISearchEndpoint {
    id: number;
    name: string;
    type: string;
    container?: {
        id: number;
        name: string;
        code: string;
    };
    product?: {
        id: number;
        name: string;
        alias: string;
    };
    deploymentsNodes?: {
        id: number;
        name: string;
        environmentName: string;
    }[];
    interface?: {
        id: number;
        name: string;
        code: string;
    };
    connectionOperation: {
        id: number;
        name: string;
        code: string;
        type: string;
    };
}

export interface ISearchEndpointsData {
    archOperations: ISearchEndpoint[];
    discoveredOperations: ISearchEndpoint[];
}

export interface IDependentSystem {
    id: number;
    name: string;
    dependentCount: number;
    cmdb: string;
    critical: string;
    ownerName: string;
}

export interface IContextElement {
    cmdb: string;
    critical: string;
    id: number;
    ownerName: string;
}
