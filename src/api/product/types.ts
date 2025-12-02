export interface IProductData {
    id: string;
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
    ownerName: string;
    critical: string | null;
}

export interface IStructurizrKey {
    structurizrApiKey: string;
    structurizrApiSecret: string;
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
    id: number;
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
    deletedDate: string | null;
}

export interface IStructurizrContainerInterfaceData {
    id: number;
    code: string | null;
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
    createDate: string;
    updateDate: string | null;
    deletedDate: string | null;
}

export interface IStructurizrContainerData {
    id: number;
    name: string;
    code: string;
    interfaces: IStructurizrContainerInterfaceData[];
    createDate: string;
    updateDate: string | null;
    deletedDate: string | null;
}

export interface IMapicInterfaceOperationData {
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
    deletedDate: string | null;
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
    operations: IMapicInterfaceOperationData[];
    createDate: string;
    updateDate: string | null;
    deletedDate: string | null;
}

export interface IConnectionInterfaceForm {
    mapicInterfaceId: number;
    archInterfaceId: number;
}

export interface IStructurizrWorkspaceForm {
    code: string;
    architect_name: string;
}

export interface IParent {
    alias: string;
}

export interface ISystemInfluence {
    dependentSystems: {
        alias: string;
        critical: string | null;
        name: string;
        ownerEmail: string;
        ownerName: string;
        uploadDate: string;
        uploadSource: null;
    }[];
}

export interface ISystemE2E {
    client: string[];
    e2e: string;
    operation: string;
}

export interface ISystemTC {
    responsibility: {
        id: number;
        code: string;
        name: string;
        description: string;
    }[];
    implemented: {
        id: number;
        code: string;
        name: string;
        description: string;
    }[];
}
export interface IFitnessFunction {
    code: string;
    description: string;
    id: number;
    isCheck: boolean;
    resultDetails: string;
    assessmentDescription: string | null;
    status: string;
    docLink: string;
    details:
        | {
              isCheck: boolean | null;
              details: {
                  key: string;
                  value: string;
              }[];
          }[]
        | null;
    tableStruct: string[] | null;
}
export interface ICompleteFitnessFunctionsData {
    assessmentId: number;
    createdDate: string;
    fitnessFunctions: IFitnessFunction[];
    productId: number;
    source: {
        source_id: number;
        source_type: string;
    };
}

export interface IInfraData {
    name: string;
    parentSystems: string[];
}
