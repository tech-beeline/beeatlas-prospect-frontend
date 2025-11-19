import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteCJ, getAllCJs, getCJById, getCJsByBIId, patchCJ, postCJ, putCJ } from 'api/cj';
import {
    CJLibraryStatus,
    ICJData,
    ICJForm,
    ICJNewData,
    ICJStepData,
    ICJStepForm,
    ICompleteCJData,
} from 'api/cj/types';
import { deleteCJStep, getCJStepById, patchCJStep, postCJStep } from 'api/cj-step';
import { deleteCJStepBI, putCJStepBIs } from 'api/cj-step';
import { ICJStepBIForm } from 'api/cj-step/types';

export const CJ_PREFIX = 'CJ_PREFIX';
const STEP_PREFIX = 'STEP_PREFIX';

interface IGetCJCollectionParams {
    search: string;
    sample: CJLibraryStatus;
    productId?: number;
}
export const useGetCJCollectionQuery = (params: IGetCJCollectionParams) => {
    return useQuery<ICJNewData[]>({
        queryKey: [CJ_PREFIX, 'all', params],
        queryFn: () =>
            getAllCJs(params.search, params.sample, params.productId).then((res) => res.data),
        placeholderData: keepPreviousData,
    });
};

export const useGetCJByIdQuery = (id: string | undefined | null) => {
    return useQuery<ICJNewData>({
        queryKey: [CJ_PREFIX, id],
        queryFn: () => getCJById(id!).then((res) => res.data),
        enabled: Boolean(id),
    });
};

interface ICreateCJParams {
    data: ICJForm;
    productId: number;
}
export function useCreateCJMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CJ_PREFIX, 'create'],
        mutationFn: (params: ICreateCJParams) => postCJ(params.data, params.productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
        },
    });
}

interface ICreateCJWithEmptyStepParams {
    data: ICJForm;
    productId: number;
}
export function useCreateCJWithEmptyStepMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CJ_PREFIX, 'createWithStep'],
        mutationFn: async (params: ICreateCJWithEmptyStepParams) => {
            const cjData = await postCJ(
                {
                    ...params.data,
                    draft: true,
                },
                params.productId,
            );
            await postCJStep(cjData.data.id, { name: 'Название этапа', order: 0 });
            return { cjId: cjData.data.id as string };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
        },
    });
}

interface IPartialUpdateCJParams {
    id: string;
    data: Partial<ICJForm>;
}
export function usePartialUpdateCJMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CJ_PREFIX, 'partialUpdate'],
        mutationFn: async ({ id, data }: IPartialUpdateCJParams) => {
            await patchCJ(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
        },
    });
}

interface IUpdateCJParams {
    id: string;
    data: ICJForm;
}
export function useUpdateCJMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CJ_PREFIX, 'update'],
        mutationFn: async ({ id, data }: IUpdateCJParams) => {
            await putCJ(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
        },
    });
}

export function useDeleteCJMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CJ_PREFIX, 'delete'],
        mutationFn: (id: string) => deleteCJ(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
        },
    });
}

export const useGetCJStepByIdQuery = (
    cjId: string | undefined | null,
    stepId: string | undefined | null,
) => {
    return useQuery<ICJStepData>({
        queryKey: [CJ_PREFIX, STEP_PREFIX, cjId, stepId],
        queryFn: ({}) => getCJStepById(cjId!, stepId!).then((res) => res.data),
        enabled: Boolean(cjId) && Boolean(stepId),
    });
};

interface ICreateCJStepParams {
    cjId: string;
    data: ICJStepForm;
}
export function useCreateCJStepMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CJ_PREFIX, STEP_PREFIX, 'create'],
        mutationFn: ({ cjId, data }: ICreateCJStepParams) => postCJStep(cjId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
        },
    });
}

interface IUpdateCJStepParams {
    stepId: string;
    data: ICJStepForm;
}
export function useUpdateCJStepMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CJ_PREFIX, STEP_PREFIX, 'update'],
        mutationFn: ({ stepId, data }: IUpdateCJStepParams) => patchCJStep(stepId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
        },
    });
}

interface IDeleteCJStepParams {
    stepId: string;
}
export function useDeleteCJStepMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CJ_PREFIX, STEP_PREFIX, 'delete'],
        mutationFn: ({ stepId }: IDeleteCJStepParams) => deleteCJStep(stepId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
        },
    });
}

export const useGetCompleteCJDataByIdQuery = (id: string | undefined | null) => {
    return useQuery<ICompleteCJData>({
        queryKey: [CJ_PREFIX, 'complete', id],
        queryFn: () => getCJById(id!).then((res) => res.data),
        enabled: Boolean(id),
    });
};

interface IUpdateCJStepBIsParams {
    stepId: string;
    data: ICJStepBIForm;
}
export function useUpdateCJStepBIsMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CJ_PREFIX, STEP_PREFIX, 'update', 'bi'],
        mutationFn: ({ stepId, data }: IUpdateCJStepBIsParams) => putCJStepBIs(stepId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
        },
    });
}

interface IDeleteStepBIParams {
    stepId: string;
    biId: string;
}
export function useDeleteBIFromStepMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CJ_PREFIX, STEP_PREFIX, 'delete', 'bi'],
        mutationFn: ({ stepId, biId }: IDeleteStepBIParams) => deleteCJStepBI(stepId, biId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CJ_PREFIX] });
        },
    });
}

export const useGetCJCollectionByBIIdQuery = (biId: string | undefined | null, enabled = true) => {
    return useQuery<ICJData[]>({
        queryKey: [CJ_PREFIX, 'byBi', biId],
        queryFn: () => getCJsByBIId(biId!).then((res) => res.data),
        enabled: enabled && Boolean(biId),
    });
};
