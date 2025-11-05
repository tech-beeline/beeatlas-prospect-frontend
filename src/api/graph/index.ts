import { AxiosPromise } from 'axios';

import { GATEWAY_ARCH_GRAPH_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';

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

export const getSystemDiagramGraph = (cmdb: string): AxiosPromise<unknown> => {
    return Api.get({
        url: `${GATEWAY_ARCH_GRAPH_URL}v1/diagram/context?cmdb=${cmdb}&communicationDirection=out`,
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
