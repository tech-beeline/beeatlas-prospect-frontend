import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getAssessmentById,
    getBCProgressForAssessment,
    getBCResultForAssessment,
    getProjectAssessments,
    getProjectById,
    getProjects,
    getStructureProgressForAssessment,
    getStructureResultForAssessment,
    getTCProgressForAssessment,
    getTCResultForAssessment,
    IPostBCForm,
    IPostImportForm,
    IPostStructureForm,
    IPostTCDescription,
    IPostTCForm,
    postAssessment,
    postBCDataForAssessment,
    postImportDataForAssessment,
    postProject,
    postStructureDataForAssessment,
    postTCDataDescriptionForAssessment,
    postTCDataForAssessment,
} from 'api/projects';
import { ICreateAssessmentDto, ICreateProjectDto, IGetProjectsParams } from 'api/projects/types';

export * from './assessment';

const PROJECTS_PREFIX = 'PROJECTS_PREFIX';

export const useGetProjectsQuery = (params: IGetProjectsParams = {}) => {
    return useQuery({
        queryKey: [PROJECTS_PREFIX, 'LIBRARY', params],
        queryFn: async () => {
            return getProjects(params).then((res) => res.data);
        },
        placeholderData: keepPreviousData,
    });
};

export const useGetProjectByIdQuery = (id?: number | string | null) => {
    return useQuery({
        queryKey: [PROJECTS_PREFIX, 'PROJECT', id],
        queryFn: async () => {
            return getProjectById(id!).then((res) => res.data);
        },
        enabled: !!id,
    });
};

export const useCreateProjectMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [PROJECTS_PREFIX, 'CREATE'],
        mutationFn: (params: ICreateProjectDto) => postProject(params).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROJECTS_PREFIX] });
        },
    });
};

export const useGetProjectAssessmentsByIdQuery = (id?: number | string | null) => {
    return useQuery({
        queryKey: [PROJECTS_PREFIX, 'PROJECT', 'ASSESSMENTS', id],
        queryFn: async () => {
            return getProjectAssessments(id!).then((res) => res.data);
        },
        enabled: !!id,
    });
};

export const useGetAssessmentByIdQuery = (id?: number | string | null) => {
    return useQuery({
        queryKey: [PROJECTS_PREFIX, 'ASSESSMENT', id],
        queryFn: async () => {
            return getAssessmentById(id!).then((res) => res.data);
        },
        enabled: !!id,
    });
};

export const useCreateAssessmentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [PROJECTS_PREFIX, 'CREATE_ASSESSMENT'],
        mutationFn: (params: ICreateAssessmentDto) =>
            postAssessment(params).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROJECTS_PREFIX] });
        },
    });
};

export const usePostImportAssessmentMutation = () => {
    return useMutation({
        mutationKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'IMPORT_DATA'],
        mutationFn: (params: IPostImportForm) =>
            postImportDataForAssessment(params).then((res) => res.data),
    });
};

export const usePostStructureAssessmentMutation = () => {
    return useMutation({
        mutationKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'STRUCTURE'],
        mutationFn: (params: IPostStructureForm) =>
            postStructureDataForAssessment(params).then((res) => res.data),
    });
};

export const useGetStrucutreProgressByIdQuery = (
    taskId?: number | string | null,
    enabled = false,
) => {
    return useQuery({
        queryKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'STRUCTURE', 'PROGRESS', taskId],
        queryFn: async () => {
            return getStructureProgressForAssessment(taskId!).then((res) => {
                if (res.data.error) throw new Error(res.data.error);
                return res.data;
            });
        },
        enabled: !!taskId && enabled,
        retry: false,
        refetchInterval: (q) =>
            q.state.error || (q.state.data as { done?: boolean })?.done ? false : 2000,
    });
};

export const useGetStrucutreResultByIdQuery = (
    taskId?: number | string | null,
    enabled = false,
) => {
    return useQuery({
        queryKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'STRUCTURE', 'RESULT', taskId],
        queryFn: async () => {
            return getStructureResultForAssessment(taskId!).then((res) => res.data);
        },
        enabled: !!taskId && enabled,
    });
};

export const usePostBCAssessmentMutation = () => {
    return useMutation({
        mutationKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'BC'],
        mutationFn: (params: IPostBCForm) =>
            postBCDataForAssessment(params).then((res) => res.data),
    });
};

export const useGetBCProgressByIdQuery = (taskId?: number | string | null, enabled = false) => {
    return useQuery({
        queryKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'BC', 'PROGRESS', taskId],
        queryFn: async () => {
            return getBCProgressForAssessment(taskId!).then((res) => res.data);
        },
        enabled: !!taskId && enabled,
        refetchInterval: 5 * 1000,
    });
};

export const useGetBCResultByIdQuery = (taskId?: number | string | null, enabled = false) => {
    return useQuery({
        queryKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'BC', 'RESULT', taskId],
        queryFn: async () => {
            return getBCResultForAssessment(taskId!).then((res) => res.data);
        },
        enabled: !!taskId && enabled,
    });
};

export const usePostTCDescriptionMutation = () => {
    return useMutation({
        mutationKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'TC', 'DESCRIPTION'],
        mutationFn: (params: IPostTCDescription) =>
            postTCDataDescriptionForAssessment(params).then((res) => res.data),
    });
};

export const usePostTCAssessmentMutation = () => {
    return useMutation({
        mutationKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'TC'],
        mutationFn: (params: IPostTCForm) =>
            postTCDataForAssessment(params).then((res) => res.data),
    });
};

export const useGetTCProgressByIdQuery = (taskId?: number | string | null, enabled = false) => {
    return useQuery({
        queryKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'TC', 'PROGRESS', taskId],
        queryFn: async () => {
            return getTCProgressForAssessment(taskId!).then((res) => res.data);
        },
        enabled: !!taskId && enabled,
        refetchInterval: 5 * 1000,
    });
};

export const useGetTCResultByIdQuery = (taskId?: number | string | null, enabled = false) => {
    return useQuery({
        queryKey: [PROJECTS_PREFIX, 'ASSESSMENT', 'TC', 'RESULT', taskId],
        queryFn: async () => {
            return getTCResultForAssessment(taskId!).then((res) => res.data);
        },
        enabled: !!taskId && enabled,
    });
};
