export interface IUseCasesTable {
    cmdb: string | null;
    search: string;
}

export enum UsecaseMethodStatus {
    IMPLEMENTED = 'IMPLEMENTED',
    PLANNED = 'PLANNED',
    REVIEW = 'REVIEW',
    NOT_MAPPED = 'NOT_MAPPED',
}
