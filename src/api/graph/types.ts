export interface ISearchSystem {
    cmdb: string;
    name: string;
}

export interface ISearchDeployment {
    id: number;
    deploymentName: string;
    cmdb: string;
    environmentName: string;
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
