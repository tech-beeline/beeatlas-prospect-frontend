import { useMutation, useQuery, useQueryClient } from 'react-query';

import { deleteBI, getBIById, getBICollection, postBI, putBI } from 'api/bi';
import { IBIData, IBIForm } from 'api/bi/types';

import { CJ_PREFIX } from '../cj';

const BI_PREFIX = 'BI_PREFIX';

export const useGetBICollectionQuery = (search: string) => {
    return useQuery<IBIData[]>([BI_PREFIX, 'all'], () =>
        getBICollection(search).then((res) => res.data),
    );
};

export const useGetBIByIdQuery = (id: string | undefined | null) => {
    return useQuery<IBIData>([BI_PREFIX, id], () => getBIById(id!).then((res) => res.data), {
        enabled: Boolean(id),
    });
};

export function useCreateBIMutation() {
    const queryClient = useQueryClient();
    return useMutation([BI_PREFIX, 'create'], (params: IBIForm) => postBI(params), {
        onSuccess: () => {
            void queryClient.invalidateQueries(BI_PREFIX);
        },
    });
}

interface IUpdateBIParams {
    id: string;
    data: IBIForm;
}
export function useUpdateBIMutation() {
    const queryClient = useQueryClient();
    return useMutation([BI_PREFIX, 'update'], ({ id, data }: IUpdateBIParams) => putBI(id, data), {
        onSuccess: () => {
            void queryClient.invalidateQueries(CJ_PREFIX);
            void queryClient.invalidateQueries(BI_PREFIX);
        },
    });
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
