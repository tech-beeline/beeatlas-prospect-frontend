export interface IPackage {
    packageId: number;
    operation: string;
    status: string;
    allParts: number;
    sucsessParts: number;
    errorParts: number;
    processParts: number;
}

export interface IPackagePart {
    partId: number;
    partNum: number;
    status: string;
    payload: string;
}

export interface IPackageWithParts {
    packageId: number;
    operation: string;
    status: string;
    parts: IPackagePart[];
}

export enum PackageStatus {
    ALL = 'ALL',
    DONE = 'DONE',
    PROCESS = 'PROCESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
}
