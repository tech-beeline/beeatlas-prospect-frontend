export enum PipelineStatuses {
    PENDING = 'pending',
    LOADING = 'loading',
    VALIDATING = 'validating',
    TRANSFORMING = 'transforming',
    SAVING = 'saving',
    PUBLISHING = 'publishing',
    AWAITING_REVIEW = 'awaiting_review',
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
    durationMs: number;
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
    durationMs: number;
    batch: number | null;
    stages: IPipelineStage[];
    rawDataRefId: number | null;
}

export interface IArtifactPipelineRunStage {
    id: number;
    stageName: string;
    status: PipelineStatuses;
    inputData: string;
    outputData: string;
    summaryJson: Record<string, unknown> | null;
    startedAt: string;
    completedAt: string | null;
    failureReason: string | null;
}

export interface IArtifactPipelineRun {
    runId: number;
    scanRunId: number;
    artifactUid: string;
    artifactName: string;
    artifactType: string;
    status: PipelineStatuses;
    sourceName: string;
    startedAt: string;
    executionStartedAt: string;
    completedAt: string | null;
    rawDataRefId: number | null;
    batch: number;
    stages: IArtifactPipelineRunStage[];
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

export interface IE2EDocType {
    id: number;
    docType: string;
    name: string;
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

export interface IStartE2EPlantUmlPipelineParams {
    artifactType: 'e2e-plantuml';
    artifactUid: string;
    source: 'manual';
    payload:
        | {
              name: string;
              plantUml: string;
              biStepCode: string;
          }
        | {
              name: string;
              docId: string | number;
              biStepCode: string;
          };
}

export interface IE2EPlantUmlPipelineRun {
    runId: number;
}

export interface IE2EPlantUmlPipelineConflictResponse {
    error: string;
    activeRunId: number;
}

export type E2EPlantUmlPipelineWaitFor = 'awaiting_review' | 'terminal';

export interface IE2EPlantUmlPipelineParticipant {
    alias: string;
    resolved: boolean;
    productAlias?: string;
    productName?: string;
    kind?: string;
}

export interface IE2EPlantUmlPipelineRequestMatch {
    status: string;
    connectionOperationId?: number;
    operationName?: string;
    operationType?: string;
    interfaceCode?: string;
    interfaceName?: string;
    containerCode?: string;
    containerName?: string;
    productAlias?: string;
    productName?: string;
}

export interface IE2EPlantUmlPipelineRequest {
    order: number;
    fromAlias: string;
    toAlias: string;
    label: string;
    type?: string;
    path?: string;
    unknown: boolean;
    productAlias?: string;
    interfaceCode?: string;
    interfaceName?: string;
    match?: IE2EPlantUmlPipelineRequestMatch;
}

export interface IE2EPlantUmlPipelineResult {
    e2e: {
        uid: string;
        name: string;
        biStepCode: string;
    };
    participants: IE2EPlantUmlPipelineParticipant[];
    requests: IE2EPlantUmlPipelineRequest[];
}

export interface IE2EPlantUmlPipelineStatus {
    runId: number;
    artifactType: string;
    artifactUid: string;
    status: PipelineStatuses;
    stage?: string;
    noticesCount?: number;
    result?: IE2EPlantUmlPipelineResult;
    more: boolean;
}

export interface IGetE2EPlantUmlPipelineStatusParams {
    runId: string | number;
    waitFor: E2EPlantUmlPipelineWaitFor;
    timeoutMs?: number;
}

export interface IStartProjectUsecasePipelineParams {
    artifactType: 'usecase';
    artifactUid: string;
    source: 'manual';
    payload: {
        projectCode: string;
        name: string;
        plantUml: string;
        biStepCode?: string;
    };
    supersedesRunId?: number;
    branch?: string;
}

export interface IProjectUsecasePipelineRun {
    runId: number;
    artifactType: 'usecase';
    artifactUid: string;
    status: PipelineStatuses;
    statusUrl: string;
}

export type ProjectUsecasePipelineOperationStatus =
    | 'matched'
    | 'architect_specified'
    | 'planned'
    | 'unmapped';

export interface IProjectUsecasePipelineParticipant {
    alias: string;
    name: string;
    resolved: boolean;
    productAlias?: string;
    productName?: string;
    source?: 'cmdb' | 'architect_decision';
}

export interface IProjectUsecasePipelineOperationDetails {
    operationVersionId: number;
    name: string;
    type: string;
    interfaceCode: string;
    interfaceName: string;
    containerCode: string;
    productAlias: string;
    productName: string;
}

export interface IProjectUsecasePipelineConnectionOperation {
    id: number;
    interfaceId: number;
    operationType: string;
    operationName: string;
    interfaceCode: string;
    containerCode: string;
    productAlias: string;
}

export interface IProjectUsecasePipelineCandidate {
    status: string;
    connectionOperationId?: number;
    operationName?: string;
    operationType?: string;
    interfaceCode?: string;
    productAlias?: string;
    productName?: string;
}

export interface IProjectUsecasePipelineStep {
    partId: string;
    seq: number;
    scenarioType: string;
    stepType: string;
    name: string;
    fromAlias: string;
    stepVersionId: number;
}

export interface IProjectUsecasePipelineOperation {
    operationId: string;
    toAlias: string;
    type: string;
    path: string;
    unknown: boolean;
    status: ProjectUsecasePipelineOperationStatus;
    source?: 'auto' | 'architect_decision';
    reason?: string;
    suggestion?: string;
    operation?: IProjectUsecasePipelineOperationDetails;
    connectionOperation?: IProjectUsecasePipelineConnectionOperation;
    candidate?: IProjectUsecasePipelineCandidate;
    steps: IProjectUsecasePipelineStep[];
}

export interface IProjectUsecasePipelineResult {
    usecase: {
        code: string;
        name: string;
        biStepCode?: string;
        projectCode: string;
    };
    branch: string;
    participants: IProjectUsecasePipelineParticipant[];
    operations: IProjectUsecasePipelineOperation[];
}

export interface IProjectUsecasePipelineStatus {
    runId: number;
    artifactType: 'usecase';
    artifactUid: string;
    status: PipelineStatuses | 'reviewing' | 'applying' | 'cancelled';
    stage: string | null;
    noticesCount: number;
    result: IProjectUsecasePipelineResult | null;
    more: boolean;
}

export interface IGetProjectUsecasePipelineStatusParams {
    runId: string | number;
    waitFor: 'awaiting_review' | 'terminal';
    timeoutMs?: number;
}

export type IProjectUsecaseMappingDecision =
    | {
          type: 'map_existing';
          operationId: string;
          connectionOperation: IProjectUsecasePipelineConnectionOperation;
          participant: string;
          productAlias: string;
      }
    | {
          type: 'planned';
          operationId: string;
      }
    | {
          type: 'product';
          operationId: string;
          participant: string;
          productAlias: string;
      };

export interface IProjectUsecaseMappingResponse {
    runId: number;
    status: 'reviewing';
    result: IProjectUsecasePipelineResult;
}

export interface IApplyProjectUsecasePipelineParams {
    runId: string | number;
    comment?: string;
}

export interface IApplyProjectUsecasePipelineResponse {
    runId: number;
    status: 'applying';
    statusUrl: string;
}

export interface ICancelProjectUsecasePipelineParams {
    runId: string | number;
    reason?: string;
}

export interface ICancelProjectUsecasePipelineResponse {
    runId: number;
    status: 'cancelled';
}
