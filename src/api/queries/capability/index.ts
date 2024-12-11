import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getBusinessCapabilityById,
    getBusinessCapabilityChildren,
    getCapabilitiesBySearch,
    getCoreBusinessCapabilities,
    getMapData,
    getTechCapabilityById,
    getTechCapabilityProducts,
    putBusinessCapability,
} from 'api/capability';
import { CapabilitySearchVariant, IBusinessCapabilityForm } from 'api/capability/types';

const CAPABILITY_PREFIX = 'CAPABILITY_PREFIX';

interface IGetCapabilitiesParams {
    search: string;
    searchVariant?: CapabilitySearchVariant;
}
export const useGetCapabilitiesQuery = (params: IGetCapabilitiesParams) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'ALL', params],
        queryFn: () =>
            getCapabilitiesBySearch(params.search, params.searchVariant).then((res) => res.data),
        enabled: params.search !== '',
    });
};

export const useGetTechCapabilityProductsQuery = (code?: string, enabled = true) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'techCapability', code],
        queryFn: () => getTechCapabilityProducts(code!).then((res) => res.data),
        enabled: enabled && Boolean(code),
    });
};

export function useCreateBusinessCapabilityMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CAPABILITY_PREFIX, 'create'],
        mutationFn: (data: IBusinessCapabilityForm) => putBusinessCapability(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CAPABILITY_PREFIX] });
        },
    });
}

export const useGetMapDataQuery = (id?: number, enabled = true) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'map', id],
        queryFn: () => getMapData(id).then((res) => res.data),
        enabled,
    });
};

export const useGetCoreCapabilitiesQuery = () => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'core'],
        queryFn: () => getCoreBusinessCapabilities().then((res) => res.data),
    });
};

export const useGetCapabilityByIdQuery = (id?: string | null) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'id', id],
        queryFn: () => getBusinessCapabilityById(id!).then((res) => res.data),
        enabled: !!id,
    });
};

export const useGetChildrenCapabilitiesQuery = ({
    id,
    enabled,
}: {
    id: number;
    enabled: boolean;
}) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'chdilren', id],
        queryFn: () => getBusinessCapabilityChildren(id).then((res) => res.data),
        enabled,
        gcTime: 0,
    });
};

export const useGetTechCapabilityByIdQuery = ({
    id,
    enabled,
}: {
    id: number;
    enabled: boolean;
}) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'tech', 'parents', id],
        queryFn: () => getTechCapabilityById(id).then((res) => res.data),
        enabled,
    });
};
