export interface IGetProjectsParams {
    statusId?: number;
    ownerId?: number;
}

export enum ProjectStatuses {
    BACKLOG = 'Backlog',
    INWORK = 'InWork',
    DONE = 'Done',
}

export enum AssessmentResults {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
}

export interface IProjectLibraryItemDto {
    id: number;
    uniqueIdent: string;
    name: string;
    docLink: string;
    ownerId: number;
    ownerName: string;
    statusId: number;
    statusName: ProjectStatuses;
    impactLevel: AssessmentResults | null;
    rawText: string;
    taskDescription: string;
    createdDate: string;
    updatedDate: string;
}

export interface IProjectDto {
    id: number;
    uniqueIdent: string;
    name: string;
    source: string;
    ownerId: number;
    ownerName: string;
    statusId: number;
    statusName: ProjectStatuses;
    impactLevel: AssessmentResults | null;
    rawText: string;
    taskDescription: string;
    createdDate: string;
    updatedDate: string;
}

export interface ICreateProjectDto {
    name: string;
    description?: string;
    docLink?: string;
    source: string;
}

export interface ICreateProjectResponseDto {
    id: number;
    name: string;
    description: string;
    source: string;
    docLink: string;
    createdDate: string;
    uniqueIdent: string;
    statusId: number;
    ownerId: number;
}

export interface IProjectAssessment {
    id: number;
    projectId: number;
    ownerId: number;
    ownerName: string;
    statusId: number;
    statusName: string;
    impactLevel: AssessmentResults;
    taskDescription: string;
    reqFuncCount: number;
    reqNonFuncCount: number;
    tcCount: number;
    productCount: number;
    oqCount: number;
    createdDate: string;
    updatedDate: string | null;
}

export interface IProjectAssessmentFullData {
    id: number;
    projectId: number;
    projectName: string;
    ownerId: number;
    ownerName: string;
    statusId: number;
    statusName: string;
    source: string;
    sourceUrl: string;
    rawText: string;
    taskDescription: string;
    impactLevel: AssessmentResults;
    reqFunc: {
        id: number;
        uniqueIdent: string;
        title: string;
        description: string;
    }[];
    reqNonFunc: {
        id: number;
        uniqueIdent: string;
        title: string;
        description: string;
    }[];
    openQuestions: {
        id: number;
        uniqueIdent: string;
        questionText: string;
    }[];
    tc: {
        id: number;
        tcCode: string;
        productAlias: string;
        productName: string;
        parentBcCode: string;
        frIds: string[];
    }[];
    designTc: {
        id: number;
        name: string;
        description: string;
        productAlias: string;
        productName: string;
        parentBcCode: string;
        frIds: string[];
    }[];
    createdDate: string;
    updatedDate: string | null;
}

export interface ICreateAssessmentDto {
    projectId: number;
    source: string;
    sourceUrl: string;
    rawText: string;
    taskDescription: string;
    impactLevel: string;
    requirementsFunc: {
        uniqueIdent: string;
        title: string;
        description: string;
    }[];
    requirementsNonFunc: {
        uniqueIdent: string;
        title: string;
        description: string;
    }[];
    openQuestions: {
        uniqueIdent: string;
        questionText: string;
    }[];
    tc: {
        tcCode: string;
        productAlias: string;
        productName: string;
        parentBcCode: string;
        frIds: string[];
    }[];
    designTc: {
        name: string;
        description: string;
        productAlias: string;
        productName: string;
        parentBcCode: string;
        frIds: string[];
    }[];
}

export interface ICreateAssessmentResponseDto {
    id: number;
    projectId: number;
    status: string;
    impactLevel: AssessmentResults;
    createdDate: string;
}

export type ProjectAssessmentImpactLevel = 'S' | 'M' | 'L' | 'XL';

export interface IProjectAssessmentRequirementDto {
    id: number;
    uniqueIdent: string;
    title: string;
    description: string;
}

export interface IProjectAssessmentOpenQuestionDto {
    id: number;
    uniqueIdent: string;
    questionText: string;
}

export interface IProjectAssessmentTechnicalCapabilityDto {
    id: number;
    tcCode: string;
    productAlias: string;
    productName: string;
    parentBcCode: string;
    frIds: string[];
}

export interface IProjectAssessmentDesignTechnicalCapabilityDto {
    id: number;
    name: string;
    description: string;
    productAlias: string;
    productName: string;
    parentBcCode: string;
    frIds: string[];
}

export interface IProjectAssessmentDto {
    id: number;
    projectId: number;
    projectName: string;
    ownerId: number;
    ownerName: string;
    statusId: number;
    statusName: string;
    source: string;
    sourceUrl: string;
    rawText: string;
    taskDescription: string;
    impactLevel: ProjectAssessmentImpactLevel;
    reqFunc: IProjectAssessmentRequirementDto[];
    reqNonFunc: IProjectAssessmentRequirementDto[];
    openQuestions: IProjectAssessmentOpenQuestionDto[];
    tc: IProjectAssessmentTechnicalCapabilityDto[];
    designTc: IProjectAssessmentDesignTechnicalCapabilityDto[];
    createdDate: string;
    updatedDate: string;
}

export type ProjectAgentType = 'internal' | 'external';

export interface IProjectAgent {
    id: number;
    name: string;
    description: string;
    type: ProjectAgentType;
}
