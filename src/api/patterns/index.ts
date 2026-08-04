import { AxiosPromise } from 'axios';

import { GATEWAY_GRAPH_VALIDATOR_URL, GATEWAY_STRUCTURIZR_URL, GATEWAY_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';

import * as T from './types';

export const getPatterns = (): AxiosPromise<T.IPattern[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/patterns`,
    });
};

export const getPatternById = (id: string | number): AxiosPromise<T.IPattern> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/pattern/${id}`,
    });
};

export const getPatternDocumentationTypes = (): AxiosPromise<T.IPatternDocumentTypesData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documentations/pattern`,
    });
};

export const getPatternFile = (patternId: number, docTypeId: number): AxiosPromise<string> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documents/${docTypeId}/${patternId}`,
    });
};

export const postPattern = (data: T.IPatternForm): AxiosPromise<{ id: number }> => {
    return Api.post({
        url: `${GATEWAY_URL}techradar/v1/pattern`,
        data,
    });
};

export const uploadPatternFile = (file: File, patternId: number) => {
    const formData = new FormData();
    formData.append('file', file);

    return Api.post({
        url: `${GATEWAY_URL}document/v1/documents/patterns/md?targetId=${patternId}&isPublic=true`,
        data: formData,
        headers: { 'Content-Disposition': `${encodeURI(file.name)}` },
    });
};

export const patchPattern = (id: string | number, data: T.IPatternForm) => {
    return Api.patch({
        url: `${GATEWAY_URL}techradar/v1/pattern/${id}`,
        data,
    });
};

export const deletePattern = (id: string | number) => {
    return Api.delete({
        url: `${GATEWAY_URL}techradar/v1/pattern/${id}`,
    });
};

export const getPatternGroups = (): AxiosPromise<T.IPatternGroup[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/pattern/group`,
    });
};

export const getPatternGroupsTree = (): AxiosPromise<T.IPatternGroupTree[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/pattern/group/tree`,
    });
};

export const postPatternGroup = (data: T.IPatternGroupForm) => {
    return Api.post({
        url: `${GATEWAY_URL}techradar/v1/pattern/group`,
        data,
    });
};

export const patchPatternGroup = (id: string | number, data: T.IPatternGroupForm) => {
    return Api.patch({
        url: `${GATEWAY_URL}techradar/v1/pattern/group/${id}`,
        data,
    });
};

export const deletePatternGroup = (id: string | number) => {
    return Api.delete({
        url: `${GATEWAY_URL}techradar/v1/pattern/group/${id}`,
    });
};

export const validateWorkspace = (data: T.IValidateWorkspaceRequest) => {
    return Api.post({
        url: `${GATEWAY_STRUCTURIZR_URL}api/v1/workspace/validate`,
        data,
    });
};

export const validateRules = (rule: string): AxiosPromise<T.IValidateRulesResponse> => {
    return Api.post({
        url: `${GATEWAY_GRAPH_VALIDATOR_URL}v2/cypher/validate`,
        data: rule,
        headers: { 'Content-Type': 'text/plain' },
    });
};

export const getPatternsByChapterId = (id: string | number): AxiosPromise<T.IPattern[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/pattern/chapter/${id}`,
    });
};
