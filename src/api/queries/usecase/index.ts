import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { downloadProjectUsecaseRawData, getPipelineRunsByArtifact } from 'api/staging-service';
import {
    applyProjectUsecaseImport,
    getProjectUsecase,
    getProjectUsecaseImportOptions,
    getProjectUsecaseOperations,
    getProjectUsecases,
    getUsecasesByBiStepCodes,
    getUsecasesByOperations,
    saveProjectUsecaseResolution,
    startProjectUsecaseImport,
} from 'api/usecase';
import {
    IApplyProjectUsecaseImport,
    ISaveProjectUsecaseResolution,
    IStartProjectUsecaseImport,
} from 'api/usecase/types';

import { mapProjectUsecaseOperations, mapProjectUsecaseRootOperations } from './utils';

export const PROJECT_USECASE_PREFIX = 'PROJECT_USECASE_PREFIX';

export const useGetProjectUsecasesQuery = (projectId?: string | number | null) => {
    return useQuery({
        queryKey: [PROJECT_USECASE_PREFIX, 'LIST', projectId],
        queryFn: () => getProjectUsecases(projectId!).then((res) => res.data),
        enabled: !!projectId,
        placeholderData: keepPreviousData,
    });
};

export const useGetProjectUsecaseQuery = (id?: number | string | null) => {
    return useQuery({
        queryKey: [PROJECT_USECASE_PREFIX, 'DETAILS', id],
        queryFn: () => getProjectUsecase(id!).then((response) => response.data),
        enabled: !!id,
    });
};

export const useGetProjectUsecaseOperationsQuery = (
    projectId?: number | string | null,
    usecaseId?: number | string | null,
) => {
    return useQuery({
        queryKey: [PROJECT_USECASE_PREFIX, 'OPERATIONS', projectId, usecaseId],
        queryFn: () =>
            getProjectUsecaseOperations(projectId!, usecaseId!).then((response) => response.data),
        select: mapProjectUsecaseOperations,
        enabled: Boolean(projectId && usecaseId),
    });
};

export const useGetProjectUsecaseRootOperationsQuery = (
    projectId?: number | string | null,
    usecaseId?: number | string | null,
) => {
    return useQuery({
        queryKey: [PROJECT_USECASE_PREFIX, 'OPERATIONS', projectId, usecaseId],
        queryFn: () =>
            getProjectUsecaseOperations(projectId!, usecaseId!).then((response) => response.data),
        select: mapProjectUsecaseRootOperations,
        enabled: Boolean(projectId && usecaseId),
    });
};

export const useGetProjectUsecaseOperationsTreeQuery = (
    projectId?: number | string | null,
    usecaseId?: number | string | null,
) => {
    return useQuery({
        queryKey: [PROJECT_USECASE_PREFIX, 'OPERATIONS', projectId, usecaseId],
        queryFn: () =>
            getProjectUsecaseOperations(projectId!, usecaseId!).then((response) => response.data),
        enabled: Boolean(projectId && usecaseId),
    });
};

export const useGetUsecasesByBiStepCodeQuery = (biStepCode?: string | null) => {
    return useQuery({
        queryKey: [PROJECT_USECASE_PREFIX, 'BY_BI_STEP', biStepCode],
        queryFn: () =>
            getUsecasesByBiStepCodes([biStepCode!]).then((response) => response.data),
        select: (groups) =>
            groups.find((group) => group.biStepCode.toLowerCase() === biStepCode!.toLowerCase())
                ?.useCases ?? [],
        enabled: Boolean(biStepCode),
    });
};

export const useGetUsecasesByOperationsQuery = (operationIds: number[]) => {
    return useQuery({
        queryKey: [PROJECT_USECASE_PREFIX, 'BY_OPERATIONS', operationIds],
        queryFn: () => getUsecasesByOperations(operationIds).then((response) => response.data),
        enabled: operationIds.length > 0,
    });
};

export const useGetProjectUsecaseHistoryQuery = (artifactUid?: string | null) => {
    return useQuery({
        queryKey: [PROJECT_USECASE_PREFIX, 'HISTORY', artifactUid],
        queryFn: () => getPipelineRunsByArtifact(artifactUid!).then((response) => response.data),
        enabled: Boolean(artifactUid),
    });
};

export const useDownloadProjectUsecaseRawDataMutation = () => {
    return useMutation({
        mutationKey: [PROJECT_USECASE_PREFIX, 'DOWNLOAD_RAW_DATA'],
        mutationFn: (rawDataRefId: number | string) =>
            downloadProjectUsecaseRawData(rawDataRefId).then((response) => response.data),
    });
};

export const useGetProjectUsecaseImportOptionsQuery = (projectId?: number | null) => {
    return useQuery({
        queryKey: [PROJECT_USECASE_PREFIX, 'IMPORT_OPTIONS', projectId],
        queryFn: () => getProjectUsecaseImportOptions(projectId!),
        enabled: Boolean(projectId),
    });
};

export const useStartProjectUsecaseImportMutation = () => {
    return useMutation({
        mutationKey: [PROJECT_USECASE_PREFIX, 'IMPORT'],
        mutationFn: (data: IStartProjectUsecaseImport) => startProjectUsecaseImport(data),
    });
};

export const useSaveProjectUsecaseResolutionMutation = () => {
    return useMutation({
        mutationKey: [PROJECT_USECASE_PREFIX, 'SAVE_RESOLUTION'],
        mutationFn: (data: ISaveProjectUsecaseResolution) => saveProjectUsecaseResolution(data),
    });
};

export const useApplyProjectUsecaseImportMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PROJECT_USECASE_PREFIX, 'APPLY_IMPORT'],
        mutationFn: (data: IApplyProjectUsecaseImport) => applyProjectUsecaseImport(data),
        onSuccess: (usecase) => {
            void queryClient.invalidateQueries({ queryKey: [PROJECT_USECASE_PREFIX, 'LIST'] });
            void queryClient.invalidateQueries({
                queryKey: [PROJECT_USECASE_PREFIX, 'DETAILS', usecase.id],
            });
            void queryClient.invalidateQueries({
                queryKey: [PROJECT_USECASE_PREFIX, 'HISTORY', usecase.id],
            });
            void queryClient.invalidateQueries({
                queryKey: [PROJECT_USECASE_PREFIX, 'OPERATIONS', usecase.projectId, usecase.id],
            });
        },
    });
};
