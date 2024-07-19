import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getCapabilitiesBySearch, getTechCapabilityProducts, putBusinessCapability } from 'api/fdm';
import { CapabilitySearchVariant, IBusinessCapabilityForm } from 'api/fdm/types';

const FDM_SEARCH_PREFIX = 'FDM_SEARCH_PREFIX';

interface IGetCapabilitiesParams {
    search: string;
    searchVariant?: CapabilitySearchVariant;
}
export const useGetCapabilitiesQuery = (params: IGetCapabilitiesParams) => {
    return useQuery(
        [FDM_SEARCH_PREFIX, 'ALL', params],
        () => getCapabilitiesBySearch(params.search, params.searchVariant).then((res) => res.data),
        {
            enabled: params.search !== '',
        },
    );
};

export const useGetTechCapabilityProductsQuery = (code?: string, enabled = true) => {
    return useQuery(
        [FDM_SEARCH_PREFIX, 'techCapability', code],
        () => getTechCapabilityProducts(code!).then((res) => res.data),
        {
            enabled: enabled && Boolean(code),
        },
    );
};

export function useCreateBusinessCapabilityMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [FDM_SEARCH_PREFIX, 'create'],
        (data: IBusinessCapabilityForm) => putBusinessCapability(data),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(FDM_SEARCH_PREFIX);
            },
        },
    );
}
