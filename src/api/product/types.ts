export interface IProductData {
    id: number;
    name: string;
    alias: string;
}

export interface IFullProductData {
    alias: string;
    description: string | null;
    gitUrl: string | null;
    id: string;
    name: string;
    structurizrApiUrl: string | null;
    structurizrWorkspaceName: string | null;
}

export interface IStructurizrInterfaceData {
    id: number;
    name: string;
    version: string;
    description: string | null;
    mapicInterface: {
        id: number;
        name: string;
        description: string | null;
    };
    operations: {
        id: string;
        name: string;
        description: string | null;
        type: string;
        mapicOperation: {
            id: number;
            name: string;
            description: string | null;
            type: string;
        };
    }[];
}

interface IStructurizrInterfaceTechCapabilityData {
    id: number;
    name: string;
    code: string;
}

export interface IStructurizrOperation {
    id: string;
    name: string;
    description: string | null;
    type: string;
    mapicOperation: {
        id: number;
        name: string;
        description: string | null;
        type: string;
    };
    techCapability: IStructurizrInterfaceTechCapabilityData | null;
    sla: { latency: number; rps: number; errorRate: number } | null;
}

export interface IStructurizrContainerInterfaceData {
    id: number;
    description: string | null;
    name: string;
    version: string;
    techCapability: IStructurizrInterfaceTechCapabilityData | null;
    protocol: string | null;
    specLink: string | null;
    mapicInterface: {
        id: number;
        name: string;
        description: string | null;
    };
    operations: IStructurizrOperation[];
}

export interface IStructurizrContainerData {
    id: number;
    name: string;
    code: string;
    interfaces: IStructurizrContainerInterfaceData[];
}

export interface IMapicInterfaceData {
    id: number;
    name: string;
    version: string;
    externalId: number;
    apiId: number;
    description: string | null;
    context: string;
    contextProvider: string | null;
    connectInterface: {
        id: number;
        name: string;
        description: string | null;
    };
    operations: {
        id: number;
        name: string;
        description: string | null;
        type: string;
        connectOperation: {
            id: number;
            name: string;
            description: string | null;
            type: string;
        } | null;
    }[];
}

export interface IConnectionInterfaceForm {
    mapicInterfaceId: number;
    archInterfaceId: number;
}
