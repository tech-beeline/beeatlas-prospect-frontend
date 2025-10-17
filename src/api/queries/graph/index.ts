import { useQuery } from '@tanstack/react-query';

import { getContextGraph, getSearchSystems, getSystemDiagramGraph } from 'api/graph';

export const GRAPH_PREFIX = 'GRAPH_PREFIX';

export const useGetContextGraphQuery = () => {
    return useQuery({
        queryKey: [GRAPH_PREFIX],
        queryFn: () => getContextGraph().then((res) => res.data),
    });
};

interface IGetSearchSytemsQueryParams {
    search: string;
    enabled: boolean;
}
export const useGetSearchSystemsQuery = (params: IGetSearchSytemsQueryParams) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'search', 'system', params],
        queryFn: () => getSearchSystems(params.search).then((res) => res.data),
        enabled: params.enabled,
        placeholderData: (prev) => prev,
    });
};

export const useGetSystemDiagramQuery = (cmdb: string) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'system', cmdb],
        queryFn: () => getSystemDiagramGraph(cmdb).then((res) => res.data),
    });
};
