import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    deleteCriteria,
    deletePersonalMap,
    getMapCriterias,
    getPersonalMapById,
    getPersonalMaps,
    getPersonalMapTypes,
    patchPersonalMap,
    patchPersonalMapGroups,
    postPersonalMap,
    putCriteria,
} from 'api/maps';
import {
    ICriteriaForm,
    IPersonalMapForm,
    IPersonalMapGroupForm,
    IPersonalMapUpdateForm,
} from 'api/maps/types';

const MAPS_PREFIX = 'MAPS_PREFIX';
const MAPS_LIBRARY_PREFIX = 'MAPS_LIBRARY_PREFIX';

export const useGetMapCriteriasQuery = (type?: 'tc' | 'bc' | null) => {
    return useQuery({
        queryKey: [MAPS_PREFIX, 'CRITERIAS', type],
        queryFn: () => getMapCriterias(type).then((res) => res.data),
    });
};

export function usePutCriteriaMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MAPS_PREFIX, 'CRITERIAS', 'update'],
        mutationFn: (data: ICriteriaForm) => putCriteria(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [MAPS_PREFIX, 'CRITERIAS'] });
        },
    });
}

export function useDeleteCriteriaMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MAPS_PREFIX, 'CRITERIAS', 'delete'],
        mutationFn: (id: string | number) => deleteCriteria(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [MAPS_PREFIX, 'CRITERIAS'] });
        },
    });
}

export const useGetPersonalMapsQuery = () => {
    return useQuery({
        queryKey: [MAPS_PREFIX, 'ALL'],
        queryFn: () => getPersonalMaps().then((res) => res.data),
    });
};

export const useGetPersonalMapByIdQuery = (id: string | number | null | undefined) => {
    return useQuery({
        queryKey: [MAPS_PREFIX, id],
        queryFn: () => getPersonalMapById(id ?? '').then((res) => res.data),
        enabled: !!id,
    });
};

export const useGetPersonalMapTypesQuery = () => {
    return useQuery({
        queryKey: [MAPS_LIBRARY_PREFIX, 'types'],
        queryFn: () => getPersonalMapTypes().then((res) => res.data),
    });
};

export function useCreatePersonalMapMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MAPS_PREFIX, 'create'],
        mutationFn: async (params: IPersonalMapForm) => {
            const data = await postPersonalMap(params);
            return { mapId: data.data.id as string };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [MAPS_PREFIX] });
        },
    });
}

interface IUpdateMapParams {
    id: string | number;
    data: IPersonalMapUpdateForm;
}
export function useUpdatePersonalMapMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MAPS_PREFIX, 'update'],
        mutationFn: (params: IUpdateMapParams) => patchPersonalMap(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [MAPS_PREFIX] });
        },
    });
}

interface IUpdateMapGroupsParams {
    id: string | number;
    data: IPersonalMapGroupForm[];
}
export function useUpdatePersonalMapGroupsMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MAPS_PREFIX, 'update-groups'],
        mutationFn: (params: IUpdateMapGroupsParams) =>
            patchPersonalMapGroups(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [MAPS_PREFIX] });
        },
    });
}

export function useDeletePersonalMapMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MAPS_PREFIX, 'delete'],
        mutationFn: (id: string) => deletePersonalMap(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [MAPS_PREFIX] });
        },
    });
}
