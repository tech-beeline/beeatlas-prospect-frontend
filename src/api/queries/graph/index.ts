import { useQuery } from '@tanstack/react-query';

import {
    getContextDotGraph,
    getDeploymentDiagramGraph,
    getDeploymentDotGraph,
    getDeploymentInfluenceById,
    getSearchDeployments,
    getSearchSystems,
} from 'api/graph';
import { ISearchDeployment, ISearchSystem } from 'api/graph/types';
import { getSystemInfrastrucutre, getSystemInfrastrucutreByIp } from 'api/product';
import { IInfraData } from 'api/product/types';

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

export const useGetCompleteArchitectureInfoQuery = (search: string) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'search', 'complete', search],
        queryFn: async () => {
            const promises: [
                Promise<ISearchSystem[]>,
                Promise<ISearchDeployment[]>,
                Promise<IInfraData[]>,
            ] = [
                getSearchSystems(search).then((res) => res.data),
                getSearchDeployments(search).then((res) => res.data),
                getSystemInfrastrucutre(search).then((res) => res.data),
            ];

            const searchTest = RegExp(
                '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
            ).test(search);
            const optionalPromises: [Promise<IInfraData[]>] | [] = searchTest
                ? [getSystemInfrastrucutreByIp(search).then((res) => res.data)]
                : [];

            const data = await Promise.allSettled([...promises, ...optionalPromises]);

            return {
                products: data[0].status === 'fulfilled' ? data[0].value : [],
                servers: {
                    graph: data[1].status === 'fulfilled' ? data[1].value : [],
                    cmdb: data[2].status === 'fulfilled' ? data[2].value : [],
                },
            };
        },
        // placeholderData: (prev) => prev,
    });
};

export const useGetSystemDiagramQuery = (cmdb: string) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'system', cmdb],
        queryFn: () => getContextDotGraph(cmdb).then((res) => res.data),
    });
};

export const useGetDeploymentDiagramQuery = (cmdb: string, env: string, deploymentName: string) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'deployment', cmdb],
        queryFn: () => getDeploymentDiagramGraph(cmdb, env, deploymentName).then((res) => res.data),
    });
};

export const useGetDeploymentDotGraphQuery = (id: string) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'deployment', 'dot', id],
        queryFn: () => getDeploymentDotGraph(id).then((res) => res.data),
    });
};

export const useGetDeploymentInfluenceQuery = (id: string) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'deployment', 'influence', id],
        queryFn: () => getDeploymentInfluenceById(id).then((res) => res.data),
    });
};
