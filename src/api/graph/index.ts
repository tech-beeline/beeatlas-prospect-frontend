import { AxiosPromise } from 'axios';

import { GATEWAY_ARCH_GRAPH_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';
import { formatNullableStringParam } from 'utils/formatters';

import * as T from './types';

export const getSearchSystems = (search: string): AxiosPromise<T.ISearchSystem[]> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/search/software-system?search=${search}`,
    });
};

export const getSearchDeployments = (search: string): AxiosPromise<T.ISearchDeployment[]> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/search/deployment-node?search=${search}`,
    });
};

export const getSearchOperations = (
    search: string,
    type?: string | null,
): AxiosPromise<T.ISearchEndpointsData> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/deployment-nodes/operation?path=${search}${formatNullableStringParam(
            'type',
            type,
        )}`,
    });
};

export const getSystemDiagramGraph = (cmdb: string): AxiosPromise<unknown> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/diagram/context?cmdb=${cmdb}&communicationDirection=in`,
    });
};

export const getContextDotGraph = (cmdb: string): AxiosPromise<string> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/context/dot?cmdb=${cmdb}`,
    });
};

export const getContextInfluenceDotGraph = (cmdb: string): AxiosPromise<string> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/context/influence/dot?cmdb=${cmdb}`,
    });
};

export const getContextElements = (cmdb: string): AxiosPromise<T.IContextElement[]> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/context/elements?cmdb=${cmdb}`,
    });
};

export const getContextInfluenceElements = (cmdb: string): AxiosPromise<T.IContextElement[]> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/context/influence/elements?cmdb=${cmdb}`,
    });
};

export const getDeploymentDiagramGraph = (
    cmdb: string,
    env: string,
    deploymentName: string,
): AxiosPromise<unknown> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/diagram/deployment?cmdb=${cmdb}&env=${env}&deployment-name=${deploymentName}`,
    });
};

export const getDeploymentDotGraph = (id: string | number): AxiosPromise<string> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/diagram/dot?id=${id}`,
    });
};

export const getDeploymentInfluenceDotGraph = (id: string | number): AxiosPromise<string> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/influence/dot?id=${id}`,
    });
};

export const getDeploymentElementsById = (
    id: string | number,
): AxiosPromise<T.IDependentSystem[]> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/diagram/elements?id=${id}`,
    });
};

export const getDeploymentInfluenceElementsById = (
    id: string | number,
): AxiosPromise<T.IDependentSystem[]> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/influence/elements?id=${id}`,
    });
};

export const getCypherQuery = (query: string): AxiosPromise<T.ICypherDiagram[]> => {
    const safeQuery = query
        .replace(/\r\n|\r|\n/g, ' ')
        .replace(/[^\x20-\x7E]/g, '?')
        .trim();

    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/elements`,
        headers: {
            'CYPHER-QUERY': safeQuery,
            'Content-Type': 'application/json',
        },
    });
};

export const getWorkspaceValidationByDocId = (
    docId: string | number,
): AxiosPromise<T.IWorkspaceValidationResult> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/workspace/validate/${docId}`,
    });
};
