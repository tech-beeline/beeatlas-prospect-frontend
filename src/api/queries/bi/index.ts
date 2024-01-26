import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
    deleteBI,
    getBIById,
    getBICollection,
    getBIEditabilityById,
    patchBI,
    postBI,
} from 'api/bi';
import { IBIData, IBIForm } from 'api/bi/types';

import { CJ_PREFIX } from '../cj';

const BI_PREFIX = 'BI_PREFIX';

interface IGetBICollectionParams {
    search: string;
    productId?: number;
    status?: number;
    draft?: boolean;
}
export const useGetBICollectionQuery = (params: IGetBICollectionParams) => {
    return useQuery<IBIData[]>(
        [BI_PREFIX, 'all', params],
        () =>
            getBICollection(params.search, params.productId, params.status, params.draft).then(
                (res) => res.data,
            ),
        { keepPreviousData: true },
    );
};

export const useGetBIByIdQuery = (id: string | undefined | null) => {
    return useQuery<IBIData>([BI_PREFIX, id], () => getBIById(id!).then((res) => res.data), {
        enabled: Boolean(id),
    });
};

export const useGetBIEditabilityByIdQuery = (id: string | undefined | null) => {
    return useQuery(
        [BI_PREFIX, 'editability', id],
        () => getBIEditabilityById(id!).then((res) => res.data),
        {
            enabled: Boolean(id),
        },
    );
};

export function useCreateBIMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [BI_PREFIX, 'create'],
        async (params: IBIForm) => {
            const biData = await postBI(params);
            return { biId: biData.data.id as string };
        },
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(BI_PREFIX);
            },
        },
    );
}

interface IUpdateBIParams {
    id: string;
    data: IBIForm;
}
export function useUpdateBIMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [BI_PREFIX, 'update'],
        ({ id, data }: IUpdateBIParams) => patchBI(id, data),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(CJ_PREFIX);
                void queryClient.invalidateQueries(BI_PREFIX);
            },
        },
    );
}

export function useDeleteBIMutation() {
    const queryClient = useQueryClient();
    return useMutation([BI_PREFIX, 'delete'], (id: string) => deleteBI(id), {
        onSuccess: () => {
            void queryClient.invalidateQueries(CJ_PREFIX);
            void queryClient.invalidateQueries(BI_PREFIX);
        },
    });
}
