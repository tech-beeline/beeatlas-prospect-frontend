import { useMutation, useQuery } from '@tanstack/react-query';

import {
    getContextDotGraph,
    getContextElements,
    getContextInfluenceDotGraph,
    getContextInfluenceElements,
    getCypherQuery,
    getDeploymentDiagramGraph,
    getDeploymentDotGraph,
    getDeploymentElementsById,
    getDeploymentInfluenceDotGraph,
    getDeploymentInfluenceElementsById,
    getSearchDeployments,
    getSearchOperations,
    getSearchSystems,
} from 'api/graph';
import { ISearchDeployment, ISearchEndpointsData, ISearchSystem } from 'api/graph/types';
import { getSystemInfrastrucutre, getSystemInfrastrucutreByIp } from 'api/product';
import { IInfraData } from 'api/product/types';

import { splitSearch } from './utils';

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

export const useGetCompleteArchitectureInfoQuery = (search: string, enabled = true) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'search', 'complete', search],
        queryFn: async () => {
            const { path, type } = splitSearch(search);

            const promises: [
                Promise<ISearchSystem[]>,
                Promise<ISearchDeployment[]>,
                Promise<IInfraData[]>,
                Promise<ISearchEndpointsData>,
            ] = [
                getSearchSystems(encodeURI(search)).then((res) => res.data),
                getSearchDeployments(encodeURI(search)).then((res) => res.data),
                getSystemInfrastrucutre(encodeURI(search)).then((res) => res.data),
                getSearchOperations(encodeURI(path), type).then((res) => res.data),
            ];

            const searchTest = RegExp(
                '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
            ).test(search);
            const optionalPromises: [Promise<IInfraData[]>] | [] = searchTest
                ? [getSystemInfrastrucutreByIp(encodeURI(search)).then((res) => res.data)]
                : [];

            const data = await Promise.allSettled([...promises, ...optionalPromises]);

            const cmdbData: IInfraData[] = [];
            if (data[2].status === 'fulfilled') {
                for (const infra of data[2].value) {
                    if (infra.parentSystems.length === 1) {
                        cmdbData.push(infra);
                    }
                    if (infra.parentSystems.length > 1) {
                        cmdbData.push(
                            ...infra.parentSystems.map((parent) => ({
                                name: infra.name,
                                parentSystems: [parent],
                            })),
                        );
                    }
                }
            }
            if (data[4] && data[4].status === 'fulfilled') {
                for (const infra of data[4].value) {
                    if (infra.parentSystems.length === 1) {
                        cmdbData.push(infra);
                    }
                    if (infra.parentSystems.length > 1) {
                        cmdbData.push(
                            ...infra.parentSystems.map((parent) => ({
                                name: infra.name,
                                parentSystems: [parent],
                            })),
                        );
                    }
                }
            }

            return {
                products: data[0].status === 'fulfilled' ? data[0].value : [],
                servers: {
                    graph: data[1].status === 'fulfilled' ? data[1].value : [],
                    cmdb: cmdbData,
                },
                endpoints:
                    data[3].status === 'fulfilled'
                        ? data[3].value
                        : { archOperations: [], discoveredOperations: [] },
            };
        },
        enabled,
    });
};

interface IGetSystemDiagramQueryParams {
    cmdb: string;
    influence: boolean;
}
export const useGetSystemDiagramQuery = (params: IGetSystemDiagramQueryParams) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'system', params],
        queryFn: () =>
            params.influence
                ? getContextInfluenceDotGraph(params.cmdb).then((res) => res.data)
                : getContextDotGraph(params.cmdb).then((res) => res.data),
    });
};

export const useGetDeploymentDiagramQuery = (cmdb: string, env: string, deploymentName: string) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'deployment', cmdb],
        queryFn: () => getDeploymentDiagramGraph(cmdb, env, deploymentName).then((res) => res.data),
    });
};

interface IGetDeploymentDiagramQuery {
    id: string;
    influence: boolean;
}
export const useGetDeploymentDotGraphQuery = (params: IGetDeploymentDiagramQuery) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'deployment', 'dot', params],
        queryFn: () =>
            params.influence
                ? getDeploymentInfluenceDotGraph(params.id).then((res) => res.data)
                : getDeploymentDotGraph(params.id).then((res) => res.data),
    });
};

interface IGetDeploymentInfluenceQueryParams {
    id: string;
    influence: boolean;
}
export const useGetDeploymentInfluenceQuery = (params: IGetDeploymentInfluenceQueryParams) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'deployment', 'influence', params],
        queryFn: () =>
            params.influence
                ? getDeploymentInfluenceElementsById(params.id).then((res) => res.data)
                : getDeploymentElementsById(params.id).then((res) => res.data),
    });
};

export const usePostCypherDiagramm = (query: string) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'cypher', query],
        queryFn: () => getCypherQuery(query).then((res) => res.data),
        enabled: !!query && query.trim().length > 0,
    });
};

interface IGetSystemInfluenceParams {
    cmdb: string;
    influence: boolean;
}
export const useGetSystemInfluenceQuery = (params: IGetSystemInfluenceParams) => {
    return useQuery({
        queryKey: [GRAPH_PREFIX, 'system', 'influence', params],
        queryFn: () =>
            params.influence
                ? getContextInfluenceElements(params.cmdb).then((res) => res.data)
                : getContextElements(params.cmdb).then((res) => res.data),
    });
};

export const useGetCypherQuery = () => {
    return useMutation({
        mutationKey: [GRAPH_PREFIX, 'cypher'],
        mutationFn: (query: string) => getCypherQuery(query).then((res) => res.data),
    });
};
