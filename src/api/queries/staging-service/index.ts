import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

import {
    applyE2EPlantUmlPipeline,
    declineE2EPlantUmlPipeline,
    downloadE2EPlantUmlFile,
    getArtifactByUid,
    getArtifactPipelinesSearch,
    getArtifactSearch,
    getE2EDocumentationTypes,
    getE2EPlantUmlFileVersions,
    getE2EPlantUmlPipelineStatus,
    getPipelineAnnotationsById,
    getPipelineArtifactTypes,
    getPipelineChildRuns,
    getPipelineDataSources,
    getPipelineRunById,
    getPipelineRunDetails,
    getPipelineRuns,
    getRawData,
    startE2EPlantUmlPipeline,
    uploadE2EPlantUmlFile,
    validateE2EPlantUmlFile,
} from 'api/staging-service';
import {
    IGetArtifactPipelinesSearchParams,
    IGetArtifactSearchParams,
    IGetE2EPlantUmlPipelineStatusParams,
    IGetPipelineAnnotationsParams,
    IGetPipilineChildRunsParams,
    IGetPipilineRunsParams,
    IStartE2EPlantUmlPipelineParams,
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

export const useGetPipelineRunDetailsQuery = (runId: number | string | null, enabled = true) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'PIPILENE_RUN_DETAILS', runId],
        queryFn: () => getPipelineRunDetails(runId!).then((res) => res.data),
        enabled: !!runId && enabled,
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

export const useGetPipelineAnnotationsQuery = (
    params: IGetPipelineAnnotationsParams,
    enabled = true,
) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'PIPELINE_ANNOTATIONS', params],
        queryFn: () => getPipelineAnnotationsById(params).then((res) => res.data),
        enabled: !!params.pipelineId && !!params.search && enabled,
        placeholderData: keepPreviousData,
    });
};

interface IUploadE2EPlantUmlParams {
    file: File;
}

export const useUploadE2EPlantUmlMutation = () => {
    return useMutation({
        mutationKey: [STAGING_SERVICE_PREFIX, 'E2E_PLANTUML', 'UPLOAD'],
        mutationFn: ({ file }: IUploadE2EPlantUmlParams) =>
            uploadE2EPlantUmlFile(file).then((res) => res.data),
    });
};

export const useValidateE2EPlantUmlMutation = () => {
    return useMutation({
        mutationKey: [STAGING_SERVICE_PREFIX, 'E2E_PLANTUML', 'VALIDATE'],
        mutationFn: (docId: string | number) =>
            validateE2EPlantUmlFile(docId).then((res) => res.data),
    });
};

export const useValidateE2EPlantUmlQuery = (docId: string | number | null) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'E2E_PLANTUML', 'VALIDATION_RESULT', docId],
        queryFn: () => validateE2EPlantUmlFile(docId!).then((res) => res.data),
        enabled: docId !== null && docId !== '',
    });
};

export const useStartE2EPlantUmlPipelineMutation = () => {
    return useMutation({
        mutationKey: [STAGING_SERVICE_PREFIX, 'E2E_PLANTUML', 'PIPELINE', 'START'],
        mutationFn: (params: IStartE2EPlantUmlPipelineParams) =>
            startE2EPlantUmlPipeline(params).then((res) => res.data),
    });
};

export const useGetE2EPlantUmlPipelineStatusMutation = () => {
    return useMutation({
        mutationKey: [STAGING_SERVICE_PREFIX, 'E2E_PLANTUML', 'PIPELINE', 'STATUS'],
        mutationFn: (params: IGetE2EPlantUmlPipelineStatusParams) =>
            getE2EPlantUmlPipelineStatus(params).then((res) => res.data),
    });
};

export const useApplyE2EPlantUmlPipelineMutation = () => {
    return useMutation({
        mutationKey: [STAGING_SERVICE_PREFIX, 'E2E_PLANTUML', 'PIPELINE', 'APPLY'],
        mutationFn: (runId: string | number) =>
            applyE2EPlantUmlPipeline(runId).then((res) => res.data),
    });
};

export const useDeclineE2EPlantUmlPipelineMutation = () => {
    return useMutation({
        mutationKey: [STAGING_SERVICE_PREFIX, 'E2E_PLANTUML', 'PIPELINE', 'DECLINE'],
        mutationFn: (runId: string | number) =>
            declineE2EPlantUmlPipeline(runId).then((res) => res.data),
    });
};

export const useGetE2EPlantUmlFileVersionsQuery = (e2eId: string | number | null) => {
    return useQuery({
        queryKey: [STAGING_SERVICE_PREFIX, 'E2E_PLANTUML', 'VERSIONS', e2eId],
        queryFn: async () => {
            const docTypes = await getE2EDocumentationTypes().then((res) => res.data);
            const docType = docTypes[0].id ?? '1';
            return getE2EPlantUmlFileVersions(docType, e2eId!).then((res) => res.data);
        },
        enabled: e2eId !== null && e2eId !== '',
    });
};

export const useDownloadE2EPlantUmlFileMutation = () => {
    return useMutation({
        mutationKey: [STAGING_SERVICE_PREFIX, 'E2E_PLANTUML', 'DOWNLOAD'],
        mutationFn: (documentId: string | number) =>
            downloadE2EPlantUmlFile(documentId).then((res) => res.data),
    });
};
