import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getBusinessCapabilityChildren,
    getCapabilitiesBySearch,
    getCoreBusinessCapabilities,
    getMapData,
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

export const useGetMapDataQuery = (id?: number) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'map', id],
        queryFn: () => getMapData(id).then((res) => res.data),
    });
};

export const useGetCoreCapabilitiesQuery = () => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'core'],
        queryFn: () => getCoreBusinessCapabilities().then((res) => res.data),
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
    });
};
