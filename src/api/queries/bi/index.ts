import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    deleteBI,
    getBIById,
    getBICollection,
    getBIEditabilityById,
    getTechCapibility,
    patchBI,
    patchSLABI,
    patchStepRelationsBI,
    postBI,
} from 'api/bi';
import { IBIData, IBIForm, IRelationForm, ISLAForm } from 'api/bi/types';

import { CJ_PREFIX } from '../cj';

const BI_PREFIX = 'BI_PREFIX';

interface IGetBICollectionParams {
    search: string;
    productId?: number;
    status?: number;
    draft?: boolean;
}
export const useGetBICollectionQuery = (params: IGetBICollectionParams) => {
    return useQuery<IBIData[]>({
        queryKey: [BI_PREFIX, 'all', params],
        queryFn: () =>
            getBICollection(params.search, params.productId, params.status, params.draft).then(
                (res) => res.data,
            ),
        placeholderData: keepPreviousData,
    });
};

export const useGetBIByIdQuery = (id: string | undefined | null) => {
    return useQuery<IBIData>({
        queryKey: [BI_PREFIX, id],
        queryFn: () => getBIById(id!).then((res) => res.data),
        enabled: Boolean(id),
    });
};

export const useGetTS = () => {
    return useQuery({
        queryKey: [BI_PREFIX],
        queryFn: () => getTechCapibility().then((res) => res.data),
    });
};

export const useGetBIEditabilityByIdQuery = (id: string | undefined | null) => {
    return useQuery({
        queryKey: [BI_PREFIX, 'editability', id],
        queryFn: () => getBIEditabilityById(id!).then((res) => res.data),
        enabled: Boolean(id),
    });
};

export function useCreateBIMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [BI_PREFIX, 'create'],
        mutationFn: async (params: IBIForm) => {
            const biData = await postBI(params);
            return { biId: biData.data.id as string };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BI_PREFIX] });
        },
    });
}

interface IUpdateBIParams {
    id: string;
    data: Partial<IBIForm>;
}
export function useUpdateBIMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [BI_PREFIX, 'update'],
        mutationFn: ({ id, data }: IUpdateBIParams) => patchBI(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
            queryClient.invalidateQueries({ queryKey: [BI_PREFIX] });
        },
    });
}

interface IUpdateBISLA {
    id: string;
    data: ISLAForm;
}

export function useUpdateBISLA() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [BI_PREFIX, 'update', 'SLA'],
        mutationFn: ({ id, data }: IUpdateBISLA) => patchSLABI(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
            queryClient.invalidateQueries({ queryKey: [BI_PREFIX] });
        },
    });
}

interface IUpdateBIStepRelations {
    id: string;
    data: IRelationForm[];
}
export function useUpdateBIStepRelations() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [BI_PREFIX, 'update', 'StepRelations'],
        mutationFn: ({ id, data }: IUpdateBIStepRelations) => patchStepRelationsBI(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
            queryClient.invalidateQueries({ queryKey: [BI_PREFIX] });
        },
    });
}

export function useDeleteBIMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [BI_PREFIX, 'delete'],
        mutationFn: (id: string) => deleteBI(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
            void queryClient.invalidateQueries({ queryKey: [BI_PREFIX] });
        },
    });
}
