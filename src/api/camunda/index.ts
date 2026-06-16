import { AxiosPromise } from 'axios';

import { GATEWAY_CAMUNDA_URL, GATEWAY_STRUCTURIZR_URL, GATEWAY_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';

import * as T from './types';

export const getProcessesByCmdb = (cmdb: string): AxiosPromise<T.IProcess[]> => {
    return Api.get({
        url: `${GATEWAY_CAMUNDA_URL}camunda-process/api/v1/processes/context/cmdb/${cmdb}`,
    });
};

export const getProcessById = (id: string | number): AxiosPromise<T.IProcessFullData> => {
    return Api.get({
        url: `${GATEWAY_CAMUNDA_URL}camunda-process/api/v1/processes/${id}`,
    });
};

export const uploadWorkspaceJSONFile = (file: File): AxiosPromise<{ docId: number }> => {
    const formData = new FormData();
    formData.append('file', file);

    return Api.post({
        url: `${GATEWAY_URL}document/v1/documents/workspace/json?isPublic=true`,
        data: formData,
        headers: { 'Content-Disposition': `${encodeURI(file.name)}` },
    });
};

export const uploadWorkspaceDSLFile = (data: {
    workspace: string;
}): AxiosPromise<{ doc_id: number }> => {
    return Api.post({
        url: `${GATEWAY_STRUCTURIZR_URL}api/v1/workspace/conversion2doc`,
        data,
    });
};

export const startProcess = (data: T.IProcessForm) => {
    return Api.post({
        url: `${GATEWAY_CAMUNDA_URL}engine-rest/process-definition/key/Process_08wprkp/start`,
        data,
    });
};
