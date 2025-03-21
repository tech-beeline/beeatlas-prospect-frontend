export interface IExportFile {
    id: number;
    doc_type: string;
    created_date: string;
    key: string | null;
    entity_type: string;
    operation_type: string;
    status: string;
}

export interface IExportResponse {
    docId: number;
}

export enum ExportVariant {
    TECH = 'tech',
    BC = 'business-capability',
    TC = 'tech-capability',
}
