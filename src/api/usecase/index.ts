import { AxiosPromise } from 'axios';

import { GATEWAY_PROJECT_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';

import {
    IProjectUsecaseDetails,
    IProjectUsecaseOperationNode,
    IProjectUsecaseSummaryDto,
    IUsecaseOperationsGroup,
    IUsecasesByBiStepCodeGroup,
} from './types';

export const getProjectUsecases = (
    projectId: string | number,
): AxiosPromise<IProjectUsecaseSummaryDto[]> => {
    return Api.get({
        url: `${GATEWAY_PROJECT_URL}v1/project/${projectId}/use-cases`,
    });
};

export const getProjectUsecase = (id: number | string): AxiosPromise<IProjectUsecaseDetails> => {
    return Api.get({
        url: `${GATEWAY_PROJECT_URL}v1/use-case/${id}`,
    });
};

export const getProjectUsecaseOperations = (
    projectId: number | string,
    usecaseId: number | string,
): AxiosPromise<IProjectUsecaseOperationNode[]> => {
    return Api.get({
        url: `${GATEWAY_PROJECT_URL}v1/project/${projectId}/use-case/${usecaseId}/operations`,
    });
};

export const getUsecasesByBiStepCodes = (
    biStepCodes: string[],
): AxiosPromise<IUsecasesByBiStepCodeGroup[]> => {
    return Api.post({
        url: `${GATEWAY_PROJECT_URL}v1/project/use-cases/by-bi-step-codes`,
        data: biStepCodes,
    });
};

export const getUsecasesByOperations = (
    operationIds: number[],
): AxiosPromise<IUsecaseOperationsGroup[]> => {
    return Api.post({
        url: `${GATEWAY_PROJECT_URL}v1/project/use-cases/operations/grouped-by-use-case`,
        data: operationIds,
    });
};

export {
    applyProjectUsecaseImport,
    getProjectUsecaseImportOptions,
    saveProjectUsecaseResolution,
    startProjectUsecaseImport,
} from './mock';
export * from './types';
