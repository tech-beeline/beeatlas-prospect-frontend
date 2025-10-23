import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    deletePatternGroup,
    getPatternById,
    getPatternGroups,
    getPatternGroupsTree,
    getPatterns,
    patchPatternGroup,
    postPattern,
    postPatternGroup,
} from 'api/patterns';
import { IPatternForm, IPatternGroupForm } from 'api/patterns/types';

const PATTERNS_PREFIX = 'PATTERNS_PREFIX';

export const useGetPatternsQuery = () => {
    return useQuery({
        queryKey: [PATTERNS_PREFIX, 'all'],
        queryFn: () => getPatterns().then((res) => res.data),
    });
};

export const useGetPatternByIdQuery = (id: string | null | undefined) => {
    return useQuery({
        queryKey: [PATTERNS_PREFIX, 'byId', id],
        queryFn: () => getPatternById(id!).then((res) => res.data),
        enabled: !!id,
    });
};

export function useCreatePatternMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PATTERNS_PREFIX, 'create'],
        mutationFn: async (params: IPatternForm) => {
            await postPattern(params);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PATTERNS_PREFIX] });
        },
    });
}

export const useGetPatternGroupsQuery = () => {
    return useQuery({
        queryKey: [PATTERNS_PREFIX, 'groups', 'all'],
        queryFn: () => getPatternGroups().then((res) => res.data),
    });
};

export const useGetPatternGroupTreeQuery = () => {
    return useQuery({
        queryKey: [PATTERNS_PREFIX, 'groups', 'tree'],
        queryFn: () => getPatternGroupsTree().then((res) => res.data),
    });
};

export function useCreatePatternGroupMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PATTERNS_PREFIX, 'group', 'create'],
        mutationFn: async (params: IPatternGroupForm) => {
            await postPatternGroup(params);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PATTERNS_PREFIX] });
        },
    });
}

interface IUpdatePatternGroupParams {
    id: string | number;
    data: IPatternGroupForm;
}
export function useUpdatePatternGroupMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PATTERNS_PREFIX, 'group', 'update'],
        mutationFn: async (params: IUpdatePatternGroupParams) => {
            await patchPatternGroup(params.id, params.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PATTERNS_PREFIX] });
        },
    });
}

export function useDeletePatternGroupMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PATTERNS_PREFIX, 'group', 'delete'],
        mutationFn: async (id: string | number) => {
            await deletePatternGroup(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PATTERNS_PREFIX] });
        },
    });
}
