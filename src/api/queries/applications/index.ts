import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getApplicationByBusinessKey,
    getApplicationByBusinessKeyOrId,
    getApplicationEntityById,
    getApplications,
    getArchitectApplications,
    getExecutorApplications,
    patchApplicationEntity,
    patchBCApplication,
    patchBCApplicationStatus,
    postBCApplication,
} from 'api/applications';
import { IApplicationPatchForm, IBCApplicationForm } from 'api/applications/types';

const APPLICATIONS_PREFIX = 'APPLICATIONS_PREFIX';

interface IGetApplicationsParams {
    enabled: boolean;
}

export const useGetApplicationsQuery = (params: IGetApplicationsParams) => {
    return useQuery({
        queryKey: [APPLICATIONS_PREFIX, 'AUTHOR'],
        queryFn: () => getApplications().then((res) => res.data),
        enabled: params.enabled,
    });
};

export const useGetArchitectApplicationsQuery = (params: IGetApplicationsParams) => {
    return useQuery({
        queryKey: [APPLICATIONS_PREFIX, 'ARCHITECT'],
        queryFn: async () => {
            const res = await Promise.all([
                getArchitectApplications().then((res) => res.data),
                getExecutorApplications().then((res) => res.data),
            ]);
            return {
                nobody: res[0],
                executor: res[1],
            };
        },
        enabled: params.enabled,
    });
};

export const useGetApplicationByIdQuery = (id: string | number | null) => {
    return useQuery({
        queryKey: [APPLICATIONS_PREFIX, 'id', id],
        queryFn: async () => {
            const res = await Promise.all([
                getApplications().then((res) => res.data),
                getArchitectApplications().then((res) => res.data),
                getExecutorApplications().then((res) => res.data),
            ]);
            return [...res[0], ...res[1], ...res[2]].find(
                (application) => application.id === Number(id),
            );
        },
        enabled: !!id,
    });
};

export const useGetApplicationByBusinessKeyQuery = (key: string | null) => {
    return useQuery({
        queryKey: [APPLICATIONS_PREFIX, 'key', key],
        queryFn: async () => {
            const application = await getApplicationByBusinessKey(key!).then((res) => res.data);
            const entity = await getApplicationEntityById(application.entity_id).then(
                (res) => res.data,
            );
            return { ...application, entity };
        },
        enabled: !!key,
    });
};

export const useGetApplicationByBusinessKeyOrIdQuery = (key: string | null, id: string | null) => {
    return useQuery({
        queryKey: [APPLICATIONS_PREFIX, 'key_id', key, id],
        queryFn: async () => {
            const application = await getApplicationByBusinessKeyOrId(key, id).then(
                (res) => res.data,
            );
            const entity = await getApplicationEntityById(application.entity_id).then(
                (res) => res.data,
            );
            return { ...application, entity };
        },
        enabled: !!key || !!id,
    });
};

export function useCreateBCApplicationMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [APPLICATIONS_PREFIX, 'create'],
        mutationFn: (data: IBCApplicationForm) => postBCApplication(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [APPLICATIONS_PREFIX] });
        },
    });
}

interface IPatchBCApplicationMutationData {
    id: string | number;
    nextStatus: string;
    data?: IApplicationPatchForm;
}
export function usePatchBCApplicationMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [APPLICATIONS_PREFIX, 'update'],
        mutationFn: (params: IPatchBCApplicationMutationData) =>
            patchBCApplication(params.id, params.nextStatus, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [APPLICATIONS_PREFIX] });
        },
    });
}

export function usePatchBCApplicationStatusMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [APPLICATIONS_PREFIX, 'update', 'status'],
        mutationFn: (params: IPatchBCApplicationMutationData) =>
            patchBCApplicationStatus(params.id, params.nextStatus, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [APPLICATIONS_PREFIX] });
        },
    });
}

interface IPatchApplicationEntityMutationData {
    id: string | number;
    nextStatus: string;
    data: IApplicationPatchForm;
}
export function usePatchApplicationEntityMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [APPLICATIONS_PREFIX, 'update', 'entity'],
        mutationFn: (params: IPatchApplicationEntityMutationData) =>
            patchApplicationEntity(params.id, params.nextStatus, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [APPLICATIONS_PREFIX] });
        },
    });
}
