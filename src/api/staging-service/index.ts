import { AxiosPromise } from 'axios';

import { GATEWAY_STAGING_SERVICE_URL, GATEWAY_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';
import { formatNullableNumberParam, formatNullableStringParam } from 'utils/formatters';

import * as T from './types';

export const getPipelineRuns = (
    params: T.IGetPipilineRunsParams,
): AxiosPromise<T.IGetPipelineRunsResults> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/pipeline-runs/scans?${formatNullableNumberParam(
            'limit',
            params.limit,
        )}${formatNullableNumberParam('offset', params.offset)}${formatNullableStringParam(
            'status',
            params.status,
        )}${formatNullableStringParam('dateFrom', params.dateFrom)}${formatNullableStringParam(
            'dateTo',
            params.dateTo,
        )}${formatNullableStringParam('sourceName', params.sourceName)}${formatNullableStringParam(
            'artifactType',
            params.artifactType,
        )}`,
    });
};

export const getPipelineRunById = (id: string | number): AxiosPromise<T.IPipileneRun> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/pipeline-runs/${id}/scan-details`,
    });
};

export const getPipelineChildRuns = (
    parentId: number | string,
    params: T.IGetPipilineChildRunsParams,
): AxiosPromise<T.IGetPipelineChildRunsResults> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/pipeline-runs/${parentId}/child?${formatNullableNumberParam(
            'limit',
            params.limit,
        )}${formatNullableNumberParam('offset', params.offset)}${formatNullableStringParam(
            'status',
            params.status,
        )}`,
    });
};

export const getPipelineRunDetails = (
    runId: number | string,
): AxiosPromise<T.IPipelineRunDetails> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/pipeline-runs/${runId}/details`,
    });
};

export const getRawData = (rawDataRefId: number | string): AxiosPromise<Record<string, any>> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/raw-data/${rawDataRefId}`,
    });
};

export const getPipelineDataSources = (): AxiosPromise<T.IPipelineDataSource[]> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/data-sources`,
    });
};

export const getPipelineArtifactTypes = (): AxiosPromise<T.IPipelineArtifactType[]> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/artifact-types`,
    });
};

export const getArtifactSearch = (
    params: T.IGetArtifactSearchParams,
): AxiosPromise<T.IGetArtifactSearchResults> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/artifacts?${formatNullableStringParam(
            'name',
            params.name,
        )}${formatNullableStringParam('artifactTypeId', params.artifactTypeId)}`,
    });
};

export const getArtifactByUid = (
    uid: string,
    type: string,
): AxiosPromise<T.IArtifactSearchResult> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/artifacts/${type}/${uid}`,
    });
};

export const getArtifactPipelinesSearch = (
    params: T.IGetArtifactPipelinesSearchParams,
): AxiosPromise<T.IGetArtifactPipelineSearchResults> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/pipeline-runs/search/${params.artifactType}/${
            params.artifactUid
        }?text=${params.text}${formatNullableStringParam('limit', params.limit)}`,
    });
};

export const getPipelineAnnotationsById = (
    params: T.IGetPipelineAnnotationsParams,
): AxiosPromise<T.IGetPipelineAnnotationsResults> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/search/notices/${params.pipelineId}?text=${
            params.search
        }${formatNullableNumberParam('limit', params.limit)}${formatNullableNumberParam(
            'offset',
            params.offset,
        )}`,
    });
};

export const uploadE2EPlantUmlFile = (
    file: File,
    targetId: string,
): AxiosPromise<T.IUploadE2EPlantUmlResult> => {
    const formData = new FormData();
    formData.append('file', file);

    return Api.post({
        url: `${GATEWAY_URL}document/v1/documents/E2E_PLANTUML/puml?targetId=${encodeURIComponent(
            targetId,
        )}&isPublic=true`,
        data: formData,
        headers: {
            'Content-Disposition': encodeURI(file.name),
        },
    });
};

export const validateE2EPlantUmlFile = (
    docId: string | number,
): AxiosPromise<T.IE2EPlantUmlValidationResult> => {
    return Api.post({
        url: `${GATEWAY_STAGING_SERVICE_URL}v1/e2e/validate/${docId}`,
    });
};

export const getE2EDocumentationTypes = (): AxiosPromise<T.IE2EDocType[]> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documentations/e2e`,
    });
};

export const getE2EPlantUmlFileVersions = (
    docTypeId: string | number,
    e2eId: string | number,
): AxiosPromise<T.IE2EPlantUmlFileVersion[]> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documents/versions/${docTypeId}/${encodeURIComponent(
            String(e2eId),
        )}`,
    });
};

export const downloadE2EPlantUmlFile = (documentId: string | number): AxiosPromise<Blob> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documents/${documentId}`,
        responseType: 'blob',
    });
};
