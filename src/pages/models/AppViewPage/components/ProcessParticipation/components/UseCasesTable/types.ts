export interface IUseCasesTable {
    cmdb: string | null;
}

export enum UsecaseMethodStatus {
    IMPLEMENTED = 'IMPLEMENTED',
    PLANNED = 'PLANNED',
    REVIEW = 'REVIEW',
    NOT_MAPPED = 'NOT_MAPPED',
}
