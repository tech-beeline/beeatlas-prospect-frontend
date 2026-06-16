import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    deletePattern,
    deletePatternGroup,
    getPatternById,
    getPatternDocumentationTypes,
    getPatternFile,
    getPatternGroups,
    getPatternGroupsTree,
    getPatterns,
    getPatternsByChapterId,
    patchPattern,
    patchPatternGroup,
    postPattern,
    postPatternGroup,
    uploadPatternFile,
    validateRules,
    validateWorkspace,
} from 'api/patterns';
import { IPatternForm, IPatternGroupForm, IValidateWorkspaceRequest } from 'api/patterns/types';

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

export const useGetPatternFileByIdQuery = (patternId: string | number | null) => {
    return useQuery({
        queryKey: [PATTERNS_PREFIX, 'file', patternId],
        queryFn: async () => {
            const docTypes = await getPatternDocumentationTypes().then((res) => res.data);
            const docTypeId = docTypes[0].id;

            const patternFile = await getPatternFile(Number(patternId), docTypeId).then(
                (res) => res,
            );
            const fileName = patternFile.headers['content-disposition']
                .split('filename=')[1]
                .replaceAll('"', '');

            return { file: patternFile.data, fileName };
        },
        enabled: !!patternId,
    });
};

export function useCreatePatternMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PATTERNS_PREFIX, 'create'],
        mutationFn: (params: IPatternForm) => postPattern(params).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PATTERNS_PREFIX] });
        },
    });
}

interface IUploadFileParams {
    file: File;
    patternId: number;
}
export const useUploadPatternFileMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [PATTERNS_PREFIX, 'upload'],
        mutationFn: async (params: IUploadFileParams) => {
            await uploadPatternFile(params.file, params.patternId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PATTERNS_PREFIX] });
        },
    });
};

interface IUpdatePatternParams {
    data: IPatternForm;
    id: number;
}
export function useUpdatePatternMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PATTERNS_PREFIX, 'update'],
        mutationFn: ({ id, data }: IUpdatePatternParams) => patchPattern(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PATTERNS_PREFIX] });
        },
    });
}

export function useDeletePatternMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PATTERNS_PREFIX, 'delete'],
        mutationFn: async (id: string | number) => {
            await deletePattern(id);
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

export const useValidateWorkspaceMutation = () => {
    return useMutation({
        mutationKey: [PATTERNS_PREFIX, 'workspace', 'validate'],
        mutationFn: (data: IValidateWorkspaceRequest) =>
            validateWorkspace(data).then((res) => res.data),
    });
};

export const useValidateRulesMutation = () => {
    return useMutation({
        mutationKey: [PATTERNS_PREFIX, 'rules', 'validate'],
        mutationFn: (rule: string) => validateRules(rule).then((res) => res.data),
    });
};

export const useGetPatternsByChapterIdQuery = (chapterId: string | number | null | undefined) => {
    return useQuery({
        queryKey: [PATTERNS_PREFIX, 'patterns', 'byChapterId', chapterId],
        queryFn: () => getPatternsByChapterId(chapterId!).then((res) => res.data),
        enabled: !!chapterId,
    });
};
