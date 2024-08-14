import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getCapabilitiesBySearch, getTechCapabilityProducts, putBusinessCapability } from 'api/fdm';
import { CapabilitySearchVariant, IBusinessCapabilityForm } from 'api/fdm/types';

const FDM_SEARCH_PREFIX = 'FDM_SEARCH_PREFIX';

interface IGetCapabilitiesParams {
    search: string;
    searchVariant?: CapabilitySearchVariant;
}
export const useGetCapabilitiesQuery = (params: IGetCapabilitiesParams) => {
    return useQuery({
        queryKey: [FDM_SEARCH_PREFIX, 'ALL', params],
        queryFn: () =>
            getCapabilitiesBySearch(params.search, params.searchVariant).then((res) => res.data),
        enabled: params.search !== '',
    });
};

export const useGetTechCapabilityProductsQuery = (code?: string, enabled = true) => {
    return useQuery({
        queryKey: [FDM_SEARCH_PREFIX, 'techCapability', code],
        queryFn: () => getTechCapabilityProducts(code!).then((res) => res.data),
        enabled: enabled && Boolean(code),
    });
};

export function useCreateBusinessCapabilityMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [FDM_SEARCH_PREFIX, 'create'],
        mutationFn: (data: IBusinessCapabilityForm) => putBusinessCapability(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [FDM_SEARCH_PREFIX] });
        },
    });
}
