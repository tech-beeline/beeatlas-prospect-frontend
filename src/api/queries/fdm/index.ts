import { useQuery } from 'react-query';

import { getSearchResult } from 'api/fdm';

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
