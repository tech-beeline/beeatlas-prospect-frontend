export enum ProjectUsecaseStatus {
    PUBLISHED = 'published',
}

export enum ProjectUsecaseSource {
    MANUAL_IMPORT = 'manual_import',
}

export enum ProjectUsecaseCallStatus {
    CONFIRMED = 'confirmed',
    PLANNED = 'planned',
}

export enum ProjectUsecaseApplicationStatus {
    RECOGNIZED = 'recognized',
    UNRECOGNIZED = 'unrecognized',
}

export enum ProjectUsecaseImportStatus {
    APPLIED = 'applied',
    ERROR = 'error',
    CANCELLED = 'cancelled',
    IN_PROGRESS = 'in_progress',
}

export interface IProjectUsecaseSummaryDto {
    id: number;
    name: string;
    code: string;
    createdDate: string;
    updatedDate: string | null;
}

export interface IProjectUsecaseBranch {
    id: number;
    name: string;
}

export interface IProjectUsecaseDetails {
    id: number;
    projectId: number;
    projectName: string;
    code: string;
    name: string;
    description: string;
    biStepCode: string | null;
    createdDate: string;
    updatedDate: string | null;
    deletedDate: string | null;
    branches: IProjectUsecaseBranch[];
}

export interface IProjectUsecaseOperationProduct {
    alias: string | null;
    name: string | null;
}

export interface IProjectUsecaseDiscoveredInterface {
    product: IProjectUsecaseOperationProduct | null;
    productPlanned: string | null;
}

export interface IProjectUsecaseTechCapability {
    code: string | null;
    name: string | null;
}

export interface IProjectUsecaseConnectedOperation {
    name: string | null;
    type: string | null;
    techCapability: IProjectUsecaseTechCapability | null;
}

export interface IProjectUsecaseDiscoveredOperation {
    id: number;
    name: string | null;
    description: string | null;
    type: string | null;
    isPlanned: boolean;
    discoveredInterface: IProjectUsecaseDiscoveredInterface;
    operation: IProjectUsecaseConnectedOperation | null;
}

export interface IProjectUsecaseOperationNode {
    order: number;
    discoveredOperationId: number;
    discoveredOperation: IProjectUsecaseDiscoveredOperation;
    children: IProjectUsecaseOperationNode[];
}

export enum ProjectUsecaseOperationStatus {
    CONFIRMED = 'confirmed',
    NOT_MAPPED = 'not_mapped',
    REVIEW = 'review',
    PLANNED = 'planned',
}

export enum ProjectUsecaseParticipantStatus {
    CONFIRMED = 'confirmed',
    NOT_CONFIRMED = 'not_confirmed',
}

export interface IProjectUsecaseOperationApplication {
    mnemonic: string | null;
    isPlanned: boolean;
}

export interface IProjectUsecaseOperationTableItem {
    id: number;
    order: number;
    caller: IProjectUsecaseOperationApplication | null;
    callee: IProjectUsecaseOperationApplication;
    action: string | null;
    call: string | null;
    technicalCapability: string | null;
    status: ProjectUsecaseOperationStatus;
}

export interface IProjectUsecaseParticipant {
    mnemonic: string | null;
    name: string | null;
    status: ProjectUsecaseParticipantStatus;
}

export interface IProjectUsecaseOperationsViewData {
    operations: IProjectUsecaseOperationTableItem[];
    participants: IProjectUsecaseParticipant[];
}

export interface IProjectUsecaseListItem {
    id: number;
    projectId: number;
    name: string;
    code: string;
    source: ProjectUsecaseSource;
    status: ProjectUsecaseStatus;
    updatedDate: string;
}

export interface IProjectUsecaseEntity {
    id: number;
    code: string;
    name: string;
}

export interface IProjectUsecaseDynamic extends IProjectUsecaseEntity {
    plantUml: string;
}

export interface IProjectUsecaseCjRelation {
    cj: IProjectUsecaseEntity;
    callerApplication: IProjectUsecaseEntity;
}

export interface IProjectUsecaseScenarioStep {
    id: number;
    code: string;
    caller: string;
    callee: string;
    action: string;
    call: IProjectUsecaseEntity & { productAlias: string };
    technicalCapability: IProjectUsecaseEntity;
    dynamic: IProjectUsecaseDynamic;
    status: ProjectUsecaseCallStatus;
}

export interface IProjectUsecaseApplication {
    id: number;
    mnemonic: string;
    name: string;
    type: string;
    status: ProjectUsecaseApplicationStatus;
}

export interface IProjectUsecase extends IProjectUsecaseListItem {
    projectName: string;
    cjRelation: IProjectUsecaseCjRelation;
    scenarioSteps: IProjectUsecaseScenarioStep[];
    applications: IProjectUsecaseApplication[];
}

export interface IProjectUsecaseImportHistoryItem {
    id: number;
    usecaseId: number;
    date: string;
    source: ProjectUsecaseSource;
    status: ProjectUsecaseImportStatus;
}

export enum ProjectUsecaseImportMode {
    NEW = 'new',
    EXISTING = 'existing',
}

export enum ProjectUsecaseResolutionType {
    EXISTING = 'existing',
    NEW = 'new',
    PLANNED = 'planned',
}

export interface IProjectUsecaseImportOption {
    id: number;
    value: string;
}

export interface IProjectUsecaseImportInterface extends IProjectUsecaseImportOption {
    code: string;
}

export interface IProjectUsecaseImportContainer extends IProjectUsecaseImportOption {
    interfaces: IProjectUsecaseImportInterface[];
}

export interface IProjectUsecaseImportApplication extends IProjectUsecaseImportOption {
    mnemonic: string;
    containers: IProjectUsecaseImportContainer[];
}

export interface IProjectUsecaseImportOptions {
    scenarios: IProjectUsecaseImportOption[];
    biSteps: IProjectUsecaseImportOption[];
    applications: IProjectUsecaseImportApplication[];
    protocols: IProjectUsecaseImportOption[];
}

export interface IStartProjectUsecaseImport {
    projectId: number;
    mode: ProjectUsecaseImportMode;
    name: string;
    usecaseId: number | null;
    biStepId: number | null;
    plantUml: string;
    fileName: string | null;
}

export interface IProjectUsecaseImportSummary {
    confirmed: number;
    unresolved: number;
    planned: number;
}

export type IProjectUsecaseMappedPart = IProjectUsecaseScenarioStep;

export interface IProjectUsecaseExistingResolution {
    type: ProjectUsecaseResolutionType.EXISTING;
    applicationId: number;
    containerId: number;
    interfaceId: number;
}

export interface IProjectUsecaseNewResolution {
    type: ProjectUsecaseResolutionType.NEW;
    applicationId: number;
    containerName: string;
    interfaceCode: string;
    protocolId: number;
    methodRequirements: string;
}

export type ProjectUsecaseResolution =
    | IProjectUsecaseExistingResolution
    | IProjectUsecaseNewResolution;

export interface IProjectUsecaseUnmappedPart {
    id: number;
    code: string;
    caller: string;
    callee: string;
    action: string;
    reason: string;
    resolution: ProjectUsecaseResolution | null;
}

export interface IProjectUsecaseImportResult {
    id: number;
    projectId: number;
    mode: ProjectUsecaseImportMode;
    name: string;
    usecaseId: number | null;
    biStepId: number | null;
    plantUml: string;
    summary: IProjectUsecaseImportSummary;
    participants: IProjectUsecaseApplication[];
    mappedParts: IProjectUsecaseMappedPart[];
    unmappedParts: IProjectUsecaseUnmappedPart[];
}

export interface ISaveProjectUsecaseResolution {
    importId: number;
    partId: number;
    resolution: ProjectUsecaseResolution;
}

export interface IApplyProjectUsecaseImport {
    importId: number;
}
