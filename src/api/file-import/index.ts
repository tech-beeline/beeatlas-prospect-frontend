import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import * as T from './types';
import { FileUploadPath } from './types';

export const getTemplateFilesList = (): AxiosPromise<T.ITemplateFile[]> => {
    return Api.get({
        url: `/templates/import/index.json`,
    });
};

export const getAllFiles = (): AxiosPromise<T.IFileData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documents/import`,
    });
};

export const uploadImportFile = (
    file: File,
    filePath: FileUploadPath,
    onUploadProgress: (e: ProgressEvent) => void,
    abortController: AbortController,
) => {
    const formData = new FormData();
    formData.append('file', file);

    return Api.post({
        url: `${GATEWAY_URL}document/v1/import/${filePath}?sync=false`,
        data: formData,
        headers: { 'Content-Disposition': `${encodeURI(file.name)}` },
        onUploadProgress,
        signal: abortController.signal,
    });
};
