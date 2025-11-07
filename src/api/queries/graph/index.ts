import { useQuery } from '@tanstack/react-query';

import {
    getDeploymentDiagramGraph,
    getSearchDeployments,
    getSearchSystems,
    getSystemDiagramGraph,
} from 'api/graph';

export const GRAPH_PREFIX = 'GRAPH_PREFIX';

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

interface IGetSearchDeploymentsQueryParams {
    search: string;
    enabled: boolean;
}
export const useGetSearchDeploymentsQuery = (params: IGetSearchDeploymentsQueryParams) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'search', 'deployment', params],
        queryFn: () => getSearchDeployments(params.search).then((res) => res.data),
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

export const useGetDeploymentDiagramQuery = (cmdb: string, env: string, deploymentName: string) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'deployment', cmdb],
        queryFn: () => getDeploymentDiagramGraph(cmdb, env, deploymentName).then((res) => res.data),
    });
};
