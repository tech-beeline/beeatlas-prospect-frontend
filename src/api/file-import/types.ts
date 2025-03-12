export interface ITemplateFile {
    name: string;
    title: string;
    type: string;
}

export enum FileStatus {
    IN_QUEUE = 'IN QUEUE',
    PACKAGE_PARSING = 'PACKAGE PARSING',
    PACKAGE_PARTS_PROCESSING = 'PACKAGE PARTS PROCESSING',
    DONE = 'DONE',
    VALIDATE_ERROR = 'VALIDATE ERROR',
    ERROR = 'ERROR',
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
    };
}

export enum FileUploadPath {
    BC = 'business_capability',
    TC = 'tech_capability',
    TECH = 'tech',
}
