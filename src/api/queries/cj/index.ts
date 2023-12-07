import { useMutation, useQuery, useQueryClient } from 'react-query';

import { deleteCJ, getAllCJs, getCJById, getCJsByBIId, patchCJ, postCJ, putCJ } from 'api/cj';
import { ICJData, ICJForm, ICJStepData, ICJStepForm, ICompleteCJData } from 'api/cj/types';
import { deleteCJStep, getCJStepById, patchCJStep, postCJStep } from 'api/cj-step';
import { deleteCJStepBI, putCJStepBIs } from 'api/cj-step';
import { ICJStepBIForm } from 'api/cj-step/types';

export const CJ_PREFIX = 'CJ_PREFIX';
const STEP_PREFIX = 'STEP_PREFIX';

export const useGetCJCollectionQuery = (search: string) => {
    return useQuery<ICJData[]>([CJ_PREFIX, 'all'], () => getAllCJs(search).then((res) => res.data));
};

export const useGetCJByIdQuery = (id: string | undefined | null) => {
    return useQuery<ICJData>([CJ_PREFIX, id], () => getCJById(id!).then((res) => res.data), {
        enabled: Boolean(id),
    });
};

export function useCreateCJMutation() {
    const queryClient = useQueryClient();
    return useMutation([CJ_PREFIX, 'create'], (params: ICJForm) => postCJ(params), {
        onSuccess: () => {
            void queryClient.invalidateQueries(CJ_PREFIX);
        },
    });
}

export function useCreateCJWithEmptyStepMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [CJ_PREFIX, 'createWithStep'],
        async (params: ICJForm) => {
            const cjData = await postCJ({
                ...params,
                draft: true,
            });
            await postCJStep(cjData.data.id, { name: 'Название шага', order: 0 });
            return { cjId: cjData.data.id as string };
        },
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
            },
        },
    );
}

interface IPartialUpdateCJParams {
    id: string;
    data: Partial<ICJForm>;
}
export function usePartialUpdateCJMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [CJ_PREFIX, 'partialUpdate'],
        async ({ id, data }: IPartialUpdateCJParams) => {
            await patchCJ(id, data);
        },
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
            },
        },
    );
}

interface IUpdateCJParams {
    id: string;
    data: ICJForm;
}
export function useUpdateCJMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [CJ_PREFIX, 'update'],
        async ({ id, data }: IUpdateCJParams) => {
            await putCJ(id, data);
        },
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
            },
        },
    );
}

export function useDeleteCJMutation() {
    const queryClient = useQueryClient();
    return useMutation([CJ_PREFIX, 'delete'], (id: string) => deleteCJ(id), {
        onSuccess: () => {
            void queryClient.invalidateQueries(CJ_PREFIX);
        },
    });
}

export const useGetCJStepByIdQuery = (
    cjId: string | undefined | null,
    stepId: string | undefined | null,
) => {
    return useQuery<ICJStepData>(
        [CJ_PREFIX, STEP_PREFIX, cjId, stepId],
        ({}) => getCJStepById(cjId!, stepId!).then((res) => res.data),
        {
            enabled: Boolean(cjId) && Boolean(stepId),
        },
    );
};

interface ICreateCJStepParams {
    cjId: string;
    data: ICJStepForm;
}
export function useCreateCJStepMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [CJ_PREFIX, STEP_PREFIX, 'create'],
        ({ cjId, data }: ICreateCJStepParams) => postCJStep(cjId, data),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
            },
        },
    );
}

interface IUpdateCJStepParams {
    stepId: string;
    data: ICJStepForm;
}
export function useUpdateCJStepMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [CJ_PREFIX, STEP_PREFIX, 'update'],
        ({ stepId, data }: IUpdateCJStepParams) => patchCJStep(stepId, data),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
            },
        },
    );
}

interface IDeleteCJStepParams {
    stepId: string;
}
export function useDeleteCJStepMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [CJ_PREFIX, STEP_PREFIX, 'delete'],
        ({ stepId }: IDeleteCJStepParams) => deleteCJStep(stepId),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
            },
        },
    );
}

export const useGetCompleteCJDataByIdQuery = (id: string | undefined | null) => {
    return useQuery<ICompleteCJData>(
        [CJ_PREFIX, 'complete', id],
        () => getCJById(id!).then((res) => res.data),
        {
            enabled: Boolean(id),
        },
    );
};

interface IUpdateCJStepBIsParams {
    stepId: string;
    data: ICJStepBIForm;
}
export function useUpdateCJStepBIsMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [CJ_PREFIX, STEP_PREFIX, 'update', 'bi'],
        ({ stepId, data }: IUpdateCJStepBIsParams) => putCJStepBIs(stepId, data),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
            },
        },
    );
}

interface IDeleteStepBIParams {
    stepId: string;
    biId: string;
}
export function useDeleteBIFromStepMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [CJ_PREFIX, STEP_PREFIX, 'delete', 'bi'],
        ({ stepId, biId }: IDeleteStepBIParams) => deleteCJStepBI(stepId, biId),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
            },
        },
    );
}

export const useGetCJCollectionByBIIdQuery = (biId: string | undefined | null) => {
    return useQuery<ICJData[]>(
        [CJ_PREFIX, 'byBi', biId],
        () => getCJsByBIId(biId!).then((res) => res.data),
        { enabled: Boolean(biId) },
    );
};
