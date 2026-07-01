import { IPattern } from 'api/patterns/types';

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
    ownerEmail: string | null;
    critical: string | null;
}

export interface IProductForm {
    alias: string;
    critical: string;
    description: string;
    employeesIds: number[];
    gitUrl: string;
    name: string;
    ownerId: number | null;
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
    deletedDate: string | null;
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
    archInterfaceId: number | null;
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

export interface IEmployee {
    email: string;
    fullName: string;
    id: number;
}

export interface IOperationContainer {
    container: {
        code: string;
        id: number;
        name: string;
    };
    id: number;
    interface: {
        code: string;
        id: number;
        name: string;
    };
    name: string;
    product: {
        alias: string;
        id: number;
        name: string;
    };
    type: string;
}

export interface IFitnessFunctionCalculationData {
    id: number;
    isCheck: boolean;
    countAll: number;
    countSuccess: number;
}
export interface IFitnessFunctionProductData {
    alias: string;
    id: number;
    name: string;
    ownerId: null | number;
    fitnessFunctions: IFitnessFunctionCalculationData[];
}
export interface IFitnessFunctionDomain {
    alias: string;
    id: number;
    name: string;
    ownerId: null | number;
    product: IFitnessFunctionProductData[];
}
export type IFitnessFunctionData = {
    id: number;
    code: string;
    description: string;
    applicability: string;
    auxiliary_check: boolean;
    status: string;
    script: string;
    method: string;
    method_synchronous: boolean;
};
export interface IFitnessFunctionsAggregationResult {
    domain: IFitnessFunctionDomain[];
    fitnessFunctionEnum: IFitnessFunctionData[];
}

export interface IProductPattern {
    code: string;
    createDate: string;
    deleteDate: string | null;
    id: number;
    isAntiPattern: boolean;
    name: string;
    rule: string;
    technologies: {
        id: number;
        label: string;
        ring: {
            id: number;
            name: string;
            order: number;
        };
        sector: {
            id: number;
            name: string;
            order: number;
        };
    }[];
    updateDate: string;
}

export interface IProductEmbeddedTech {
    id: number;
    label: string;
    link: string | null;
    isCritical: boolean;
    review: boolean;
    lastModifiedDate: string;
    ring: {
        id: number;
        name: string;
        order: number;
    };
    sector: {
        id: number;
        name: string;
        order: number;
    };
    category: {
        id: number;
        name: string;
    }[];
}

export interface IProductTechProduct {
    id: number;
    createdDate: string;
    deletedDate: string | null;
    lastModifiedDate: string;
    source: string;
    tech: IProductEmbeddedTech | null;
}

export interface IProductTechnology extends IFullProductData {
    techProducts: IProductTechProduct[];
}

export interface INonFunctionalRequirement {
    id: string;
    code: string;
    version: number;
    name: string;
    description: string;
    rule: string;
    source: string;
    sourcePurpose: string | null;
    createdDate: string;
}
export interface IChapter {
    id: number;
    name: string;
    description: string;
    code: string;
    docLink: string;
    nfr: INonFunctionalRequirement[];
}

export interface INonFunctionalRequirementFullData extends INonFunctionalRequirement {
    fitnessFunctions: IFitnessFunctionData[];
    chapters: Omit<IChapter, 'nfr'>[];
    patterns: Omit<IPattern, 'groups' | 'technologies'>[];
}

export interface ILifeSituationForm {
    name: string;
    description: string;
    docLink: string;
    nfr: number[];
    patterns: number[];
}

export interface INFRForm {
    name: string;
    description: string;
    rule: string;
    chapters: number[];
    patterns: number[];
}
