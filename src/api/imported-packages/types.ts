export enum PackageStatus {
    SUCCESS = 'SUCCESS',
    PROCESS = 'PROCESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
}

export enum PackageOperation {
    UPDATE_BUSINESS_CAPABILITIES = 'UPDATE_BUSINESS_CAPABILITIES',
    UPDATE_TECH_CAPABILITIES = 'UPDATE_TECH_CAPABILITIES',
    UPDATE_PRODUCT = 'UPDATE_PRODUCT',
}

export interface IPackage {
    packageId: number;
    operation: PackageOperation;
    status: PackageStatus;
    allParts: number;
    successParts: number;
    errorParts: number;
    processParts: number;
    createdDate: string;
}

export interface IPackagesData {
    content: IPackage[];
    totalElements: number;
    totalPages: number;
}

export interface IPackagePart {
    partId: number;
    partNum: number;
    status: PackageStatus;
    payload: string;
}

export interface IPackageWithParts {
    packageDTO: {
        packageId: number;
        operation: string;
        status: string;
    };
    packagePartDTOS: {
        content: IPackagePart[];
        totalElements: number;
        totalPages: number;
    };
}
