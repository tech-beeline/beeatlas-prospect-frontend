import { AxiosPromise } from 'axios';

import { GATEWAY_PROJECT_URL, GATEWAY_SOLUTION_CHECKER_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';
import { formatNullableNumberParam } from 'utils/formatters';

import * as T from './types';

export const getProjects = (
    params: T.IGetProjectsParams,
): AxiosPromise<T.IProjectLibraryItemDto[]> => {
    return Api.get({
        url: `${GATEWAY_PROJECT_URL}v1/project?${formatNullableNumberParam(
            'status-id',
            params.statusId,
        )}${formatNullableNumberParam('owner-id', params.ownerId)}`,
    });
};

export const getProjectById = (id: number | string): AxiosPromise<T.IProjectDto> => {
    return Api.get({
        url: `${GATEWAY_PROJECT_URL}v1/project/${id}`,
    });
};

export const postProject = (data: T.ICreateProjectDto): AxiosPromise<{ id: number }> => {
    return Api.post({
        url: `${GATEWAY_PROJECT_URL}v1/project`,
        data,
    });
};

export const getProjectAssessments = (
    projectId: number | string,
): AxiosPromise<T.IProjectAssessment[]> => {
    return Api.get({
        url: `${GATEWAY_PROJECT_URL}v1/assessments?project-id=${projectId}`,
    });
};

export const getAssessmentById = (
    id: number | string,
): AxiosPromise<T.IProjectAssessmentFullData> => {
    return Api.get({
        url: `${GATEWAY_PROJECT_URL}v1/assessments/${id}`,
    });
};

export const postAssessment = (
    data: T.ICreateAssessmentDto,
): AxiosPromise<T.ICreateAssessmentResponseDto> => {
    return Api.post({
        url: `${GATEWAY_PROJECT_URL}v1/assessments`,
        data,
    });
};

// IMPORT

export interface IPostImportForm {
    include_child_pages?: boolean;
    text?: string;
    confluence_pat?: string;
    confluence_url?: string;
}
export const postImportDataForAssessment = (
    data: IPostImportForm,
): AxiosPromise<{ raw_text: string }> => {
    return Api.post({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}intake/import`,
        data,
    });
};

// REQUIREMENTS

export interface IPostStructureForm {
    raw_text: string;
}
export const postStructureDataForAssessment = (
    data: IPostStructureForm,
): AxiosPromise<{ task_id: string }> => {
    return Api.post({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}intake/structure/start`,
        data,
    });
};

export interface IStrucutureProgress {
    phase: string;
    current_chunk: number;
    total_chunks: number;
    chars_sent: number;
    last_response_chars: number;
    chunk_size: number;
    attempts: number;
    merge_input_chars: number;
    merge_attempts: number;
    done: boolean;
    error: string | null;
}
export const getStructureProgressForAssessment = (
    taskId: string | number,
): AxiosPromise<IStrucutureProgress> => {
    return Api.get({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}intake/structure/${taskId}/progress`,
    });
};

export enum StructureRequirementType {
    FR = 'FR',
    NFR = 'NFR',
    OQ = 'OQ',
}
export interface IStructureRequirement {
    description: string;
    id: string;
    title: string;
    type: StructureRequirementType;
}
export interface IStrucutureResult {
    requirements: IStructureRequirement[];
}
export const getStructureResultForAssessment = (
    taskId: string | number,
): AxiosPromise<IStrucutureResult> => {
    return Api.get({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}intake/structure/${taskId}/result`,
    });
};

// BC

export interface IPostBCForm {
    task_text: string;
}
export const postBCDataForAssessment = (data: IPostBCForm): AxiosPromise<{ task_id: string }> => {
    return Api.post({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}bc/identify/start`,
        data,
    });
};

export interface IBCProgress {
    phase: string;
    data_chars: number;
    response_chars: number;
    attempts: number;
    elapsed_ms: number;
    done: boolean;
    error: string | null;
}
export const getBCProgressForAssessment = (taskId: string | number): AxiosPromise<IBCProgress> => {
    return Api.get({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}bc/identify/${taskId}/progress`,
    });
};

export interface IBCCandidate {
    code: string;
    description: string;
    relevance: number;
    reason: string;
}
export interface IBCResult {
    candidates: IBCCandidate[];
}
export const getBCResultForAssessment = (taskId: string | number): AxiosPromise<IBCResult> => {
    return Api.get({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}bc/identify/${taskId}/result`,
    });
};

// TC

export interface IPostTCDescription {
    raw_content: string;
}
export const postTCDataDescriptionForAssessment = (
    data: IPostTCDescription,
): AxiosPromise<{ task_description: string }> => {
    return Api.post({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}tc/describe-task`,
        data,
    });
};

export interface IPostTCForm {
    task_description: string;
    business_capabilities: { code: string; description: string }[];
    structured_requirements: IStructureRequirement[];
}
export const postTCDataForAssessment = (data: IPostTCForm): AxiosPromise<{ task_id: string }> => {
    return Api.post({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}tc/identify/start`,
        data,
    });
};

export interface ITCProgress {
    phase: string;
    total_fr: number;
    total_candidates: number;
    data_chars: number;
    response_chars: number;
    attempts: number;
    elapsed_ms: number;
    current_chunk: number;
    total_chunks: number;
    merge_input_chars: number;
    merge_attempts: number;
    done: boolean;
    error: string | null;
}
export const getTCProgressForAssessment = (taskId: string | number): AxiosPromise<ITCProgress> => {
    return Api.get({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}tc/identify/${taskId}/progress`,
    });
};

export interface ITCCandidate {
    name: string;
    description: string;
    rationale: string;
    score?: number;
    fr_ids: string[];
}
export interface ITCResult {
    candidates: ITCCandidate[];
}
export const getTCResultForAssessment = (taskId: string | number): AxiosPromise<ITCResult> => {
    return Api.get({
        url: `${GATEWAY_SOLUTION_CHECKER_URL}tc/identify/${taskId}/result`,
    });
};
