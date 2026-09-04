export enum PipelineStatuses {
    PENDING = 'pending',
    LOADING = 'loading',
    VALIDATING = 'validating',
    TRANSFORMING = 'transforming',
    SAVING = 'saving',
    PUBLISHING = 'publishing',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

export interface IPipileneRun {
    id: number;
    code: string;
    artifactType: string;
    status: PipelineStatuses;
    sourceName: string;
    startedAt: string;
    completedAt: string | null;
    childStats: {
        status: PipelineStatuses;
        count: number;
    }[];
}

export interface IPipelineChildRun {
    id: number;
    artifactUid: string;
    artifactName: string;
    artifactType: string;
    status: PipelineStatuses;
    sourceName: string;
    startedAt: string;
    completedAt: string;
    failureReason: string | null;
    failedStage: string | null;
    rawDataRefId: number | null;
}

interface IPipelineStage {
    id: number;
    runId: number;
    scanRunId: number;
    stageName: string;
    status: PipelineStatuses;
    inputData: string;
    outputData: string;
    summaryJson: Record<string, any> | null;
    startedAt: string;
    completedAt: string | null;
    failureReason: string | null;
}

export interface IPipelineRunDetails {
    id: number;
    artifactUid: string;
    artifactName: string;
    artifactType: string;
    status: PipelineStatuses;
    sourceName: string;
    startedAt: string;
    completedAt: string;
    batch: number | null;
    stages: IPipelineStage[];
    rawDataRefId: number | null;
}

export interface IGetPipilineRunsParams {
    limit?: number;
    offset?: number;
    status?: PipelineStatuses | null;
    dateFrom?: string | null;
    dateTo?: string | null;
    sourceName?: string | null;
    artifactType?: string | null;
}

export interface IGetPipelineRunsResults {
    totalCount: number;
    results: IPipileneRun[];
}

export interface IGetPipilineChildRunsParams {
    limit?: number;
    offset?: number;
    status?: PipelineStatuses | null;
    sourceName?: string | null;
    artifactType?: string | null;
}

export interface IGetPipelineChildRunsResults {
    totalCount: number;
    results: IPipelineChildRun[];
}

export interface IPipelineDataSource {
    id: number;
    code: string;
    name: string;
    address: string | null;
    createdAt: string;
}

export interface IPipelineArtifactType {
    id: number;
    name: string;
    dataTypeCode: string;
    sourceSystemCode: string;
    sourceSystemName: string;
    createdAt: string;
}

export interface IGetArtifactSearchParams {
    name?: string;
    artifactTypeId?: string | null;
    limit?: number;
    offset?: number;
}

export enum ArtifactStatuses {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DELETED = 'deleted',
}
export interface IArtifactSearchResult {
    id: number;
    extUid: string;
    name: string;
    artifactTypeId: number;
    status: ArtifactStatuses;
    lastRunId: number;
    lastSeenScanRunId: number;
    updatedAt: string;
    foundIn: string;
    sourceCode: string;
    sourceName: string;
}

export interface IGetArtifactSearchResults {
    totalCount: number;
    results: IArtifactSearchResult[];
}

export interface IGetArtifactPipelinesSearchParams {
    text: string;
    artifactType: string;
    artifactUid: string;
    limit?: string;
}

interface IArtifactHit {
    contexts: { id: number; snippet: string }[];
    endOffset: number;
    snippet: string | null;
    startOffset: number;
}

export interface IArtifactPipelineSearchResult {
    id: number;
    rawDataRefId: number;
    startedAt: string;
    status: PipelineStatuses;
    artifactName: string;
    artifactType: string;
    artifactUid: string;
    count: number;
    hits: IArtifactHit[];
}

export interface IGetArtifactPipelineSearchResults {
    totalCount: number;
    results: IArtifactPipelineSearchResult[];
}

export enum NoticeLevels {
    INFO = 'info',
    ERROR = 'error',
    WARNING = 'warning',
}

export interface IPipelineAnnotation {
    id: number;
    noticeTypeId: number;
    code: string;
    level: NoticeLevels;
    category: string;
    description: string | null;
    details: string | null;
    rawDataRefId: number;
}

export interface IGetPipelineAnnotationsParams {
    pipelineId: number | string | null;
    search?: string;
    limit?: number;
    offset?: number;
}

export interface IGetPipelineAnnotationsResults {
    totalCount: number;
    results: IPipelineAnnotation[];
}

export interface IUploadE2EPlantUmlResult {
    docId: number;
}

export interface IE2EPlantUmlFileVersion {
    id: string | number;
    key: string | null;
    created_date: string;
}

export interface IE2EPlantUmlParticipant {
    alias: string;
    name?: string;
    kind?: string;
    line: number;
}

export interface IE2EPlantUmlRecognizedCall {
    fromAlias: string;
    toAlias: string;
    httpMethod: string;
    path: string;
    line: number;
}

export interface IE2EPlantUmlUnrecognizedCall {
    fromAlias: string;
    toAlias: string;
    label: string;
    line: number;
}

export interface IE2EPlantUmlNotice {
    code: string;
    level: NoticeLevels;
    message: string;
    lineFrom: number;
    lineTo: number;
    elementRef: string;
}

export interface IE2EPlantUmlValidationResult {
    valid: boolean;
    recognizedParticipants: IE2EPlantUmlParticipant[];
    unrecognizedParticipants: IE2EPlantUmlParticipant[];
    recognizedCalls: IE2EPlantUmlRecognizedCall[];
    unrecognizedCalls: IE2EPlantUmlUnrecognizedCall[];
    notices: IE2EPlantUmlNotice[];
}
