export interface ITemplateFile {
    name: string;
    title: string;
    type: string;
}

export enum FileStatus {
    PROCESS = 'PROCESS',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
    VALIDATE_ERROR = 'VALIDATE ERROR',
}

export interface IFileData {
    id: number;
    doc_type: string;
    created_date: string;
    key: string;
    entity_type: string;
    operation_type: string;
    package_info: {
        allParts: number;
        createdDate: string;
        errorParts: number;
        operation: string;
        packageId: number;
        processParts: number;
        status: FileStatus;
        successParts: number;
        source: string;
        source_id: number;
    } | null;
}

export enum FileUploadPath {
    BC = 'business_capability',
    TC = 'tech_capability',
    CRITERIAS = 'capability_criterias',
}
