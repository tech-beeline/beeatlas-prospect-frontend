import { useQuery } from 'react-query';

import { getSearchResult, getTechCapabilityProducts } from 'api/fdm';

const FDM_SEARCH_PREFIX = 'FDM_SEARCH_PREFIX';

export const useGetFDMSearchQuery = (request: string) => {
    return useQuery(
        [FDM_SEARCH_PREFIX, 'ALL', request],
        () => getSearchResult(request).then((res) => res.data),
        {
            enabled: request !== '',
        },
    );
};

export const useGetTechCapabilityProductsQuery = (guid?: string, enabled = true) => {
    return useQuery(
        [FDM_SEARCH_PREFIX, 'techCapability', guid],
        () => getTechCapabilityProducts(guid!).then((res) => res.data),
        {
            enabled: enabled && Boolean(guid),
        },
    );
};
