import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import * as T from './types';

export const getSearchSystems = (search: string): AxiosPromise<T.ISearchSystem[]> => {
    return Api.get({
        // url: `https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/graph-service/api/v1/search/software-system?search=${search}`,
        url: `https://architect-graph-service-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api/v1/search/software-system?search=${search}`,
    });
};

export const getContextGraph = (): AxiosPromise<unknown> => {
    return Api.get({
        url: `https://architect-graph-service-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api/v1/context/fdmshowcaseapp`,
    });
};

export const getSystemDiagramGraph = (cmdb: string): AxiosPromise<unknown> => {
    return Api.get({
        url: `https://architect-graph-service-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api/v1/diagram/context?cmdb=${cmdb}&communicationDirection=out`,
    });
};
