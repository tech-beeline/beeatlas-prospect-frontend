import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    getArtifactByUid,
    getArtifactPipelinesSearch,
    getArtifactSearch,
    getPipelineAnnotationsById,
    getPipelineArtifactTypes,
    getPipelineChildRuns,
    getPipelineDataSources,
    getPipelineRunById,
    getPipelineRunDetails,
    getPipelineRuns,
    getRawData,
} from 'api/staging-service';
import {
    IGetArtifactPipelinesSearchParams,
    IGetArtifactSearchParams,
    IGetPipelineAnnotationsParams,
    IGetPipilineChildRunsParams,
    IGetPipilineRunsParams,
} from 'api/staging-service/types';

const STAGING_SERVICE_PREFIX = 'STAGING_SERVICE_PREFIX';

export const useGetPipelineRunsQuery = (params?: IGetPipilineRunsParams) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'PIPILENE_RUNS', params],
        queryFn: () => getPipelineRuns(params ?? {}).then((res) => res.data),
        placeholderData: keepPreviousData,
    });
};

export const useGetPipelineRunById = (id: number | string | null) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'PIPILENE_RUNS', 'BY_ID', id],
        queryFn: () => getPipelineRunById(id!).then((res) => res.data),
        enabled: !!id,
    });
};

export const useGetPipelineChildRunsQuery = (
    parentId: number | string | null,
    params?: IGetPipilineChildRunsParams,
) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'PIPILENE_CHILD_RUNS', parentId, params],
        queryFn: () => getPipelineChildRuns(parentId!, params ?? {}).then((res) => res.data),
        enabled: !!parentId,
        placeholderData: keepPreviousData,
    });
};

export const useGetPipelineRunDetailsQuery = (runId: number | string | null) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'PIPILENE_RUN_DETAILS', runId],
        queryFn: () => getPipelineRunDetails(runId!).then((res) => res.data),
        enabled: !!runId,
    });
};

export const useGetRawDataQuery = (rawDataRefId?: number | string | null) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'RAW_DATA', rawDataRefId],
        queryFn: () => getRawData(rawDataRefId!).then((res) => res.data),
        enabled: !!rawDataRefId,
    });
};

export const useGetPipelineDataSourcesQuery = () => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'DATA_SOURCES'],
        queryFn: () => getPipelineDataSources().then((res) => res.data),
    });
};

export const useGetPipelineArtifactTypesQuery = () => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'ARTIFACT_TYPES'],
        queryFn: () => getPipelineArtifactTypes().then((res) => res.data),
    });
};

export const useGetArtifactSearchQuery = (params: IGetArtifactSearchParams) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'ARTIFACT_SEARCH', params],
        queryFn: () => getArtifactSearch(params).then((res) => res.data),
        enabled: !!params.name,
    });
};

export const useGetArtifactByUidQuery = (uid: string | null, type: string | null) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'ARTIFACT_SEARCH', type, uid],
        queryFn: () => getArtifactByUid(uid!, type!).then((res) => res.data),
        enabled: !!type && !!uid,
    });
};

export const useGetArtifactPipelinesSearchQuery = (params: IGetArtifactPipelinesSearchParams) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'PIPELINE_SEARCH', params],
        queryFn: () => getArtifactPipelinesSearch(params).then((res) => res.data),
        enabled: !!params.text,
    });
};

export const useGetPipelineAnnotationsQuery = (params: IGetPipelineAnnotationsParams) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'PIPELINE_ANNOTATIONS', params],
        queryFn: () => getPipelineAnnotationsById(params).then((res) => res.data),
        enabled: !!params.pipelineId && !!params.search,
        placeholderData: keepPreviousData,
    });
};
