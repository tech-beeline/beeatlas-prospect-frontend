import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
    deleteCJ,
    deleteCJStep,
    getAllCJs,
    getCJById,
    getCJStepById,
    getCJStepCollection,
    postCJ,
    postCJStep,
    putCJ,
    putCJStep,
} from 'api/cj';
import { ICJData, ICJForm, ICJStepData, ICJStepForm } from 'api/cj/types';

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
        async () => {
            const cjData = await postCJ({
                draft: true,
                name: 'Название CJ',
                user_portrait: 'Портрет пользователя',
            });
            await postCJStep(cjData.data.id, { name: 'Название шага', order: 0 });
            return (cjData.data.id as string) ?? '0';
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
    return useMutation([CJ_PREFIX, 'update'], ({ id, data }: IUpdateCJParams) => putCJ(id, data), {
        onSuccess: () => {
            void queryClient.invalidateQueries(CJ_PREFIX);
        },
    });
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
    cjId: string;
    stepId: string;
    data: ICJStepForm;
}
export function useUpdateCJStepMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [CJ_PREFIX, STEP_PREFIX, 'update'],
        ({ cjId, stepId, data }: IUpdateCJStepParams) => putCJStep(cjId, stepId, data),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
            },
        },
    );
}

interface IDeleteCJStepParams {
    cjId: string;
    stepId: string;
}
export function useDeleteCJStepMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [CJ_PREFIX, STEP_PREFIX, 'delete'],
        ({ cjId, stepId }: IDeleteCJStepParams) => deleteCJStep(cjId, stepId),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
            },
        },
    );
}

interface ICompleteCJData extends ICJData {
    steps: ICJStepData[];
}
export const useGetCompleteCJDataByIdQuery = (id: string | undefined | null) => {
    return useQuery<ICompleteCJData>(
        [CJ_PREFIX, 'complete', id],
        async () => {
            const data = await Promise.all([
                getCJById(id!).then((res) => res.data),
                getCJStepCollection(id!).then((res) => res.data),
            ]);
            return { ...data[0], steps: [...data[1]] };
        },
        {
            enabled: Boolean(id),
        },
    );
};
