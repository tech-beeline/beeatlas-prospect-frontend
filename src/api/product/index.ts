import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableStringParam } from 'utils/formatters';

import {
    GATEWAY_CAPABILITY_URL,
    GATEWAY_PRODUCT_URL,
    GATEWAY_URL,
    STRUCTURIZR_URL,
} from '../const';

import * as T from './types';

export const getUserProducts = (): AxiosPromise<T.IProductData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/user/product/admin`,
    });
};

export const getProductsByTechnologyId = (id: number): AxiosPromise<T.IProductData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/tech/${id}/product`,
    });
};

export const getProductStructurizrContainerByCmdb = (
    cmdb: string,
): AxiosPromise<T.IStructurizrContainerData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/product/${cmdb}/container?show-hidden=true`,
    });
};

export const getProductStructurizrInterfacesByCmdb = (
    cmdb: string,
): AxiosPromise<T.IStructurizrInterfaceData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/product/${cmdb}/interface/arch`,
    });
};

export const getProductMapicInterfacesByCmdb = (
    cmdb: string,
): AxiosPromise<T.IMapicInterfaceData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/product/${cmdb}/interface/mapic`,
    });
};

export const postConnectionInterface = (data: T.IConnectionInterfaceForm) => {
    return Api.post({
        url: `${GATEWAY_URL}product/v1/connection/interface`,
        data,
    });
};

export const getProductFitnessFunctionsByCmdb = (
    cmdb: string,
): AxiosPromise<T.ICompleteFitnessFunctionsData> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/${cmdb}/fitness-function`,
    });
};

export const getAllProducts = (): AxiosPromise<T.IFullProductData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/product/info`,
    });
};

export const getProductInfoByCmdb = (cmdb: string): AxiosPromise<T.IFullProductData> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/product/${cmdb}/info`,
    });
};

export const getEntityParent = (id: string, type: string): AxiosPromise<T.IParent> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/parent?${formatNullableStringParam(
            'id',
            id,
        )}${formatNullableStringParam('type', type)}`,
    });
};

export const postStructurizrWorkspace = (data: T.IStructurizrWorkspaceForm) => {
    return Api.post({
        url: `${STRUCTURIZR_URL}workspace`,
        data,
    });
};

export const getSystemInfluence = (cmdb: string): AxiosPromise<T.ISystemInfluence> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/${cmdb}/influence`,
    });
};

export const getDeploymentInfluence = (cmdb: string): AxiosPromise<T.ISystemInfluence> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/deployment/${cmdb}/influence`,
    });
};

export const getSystemE2E = (cmdb: string): AxiosPromise<T.ISystemE2E[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/${cmdb}/e2e`,
    });
};

export const getSystemTC = (id: string | number): AxiosPromise<T.ISystemTC> => {
    return Api.get({
        url: `${GATEWAY_CAPABILITY_URL}v1/tech-capabilities/product/${id}`,
    });
};
