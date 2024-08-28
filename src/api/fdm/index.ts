import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { API_URL, GATEWAY_URL } from '../const';

import * as T from './types';

export const getSearchResult = (text: string): AxiosPromise<T.ICapability[]> => {
    return Api.get({
        url: `${API_URL}fdm/v1/capabilities/findByText?text=${text}`,
    });
};

export const getGeneralItems = () => {
    return Api.get({
        url: `${API_URL}fdm/v1/groups`,
    });
};

export const getItemChildren = (id: number) => {
    return Api.get({
        url: `${API_URL}fdm/v1/capabilities/findByDomain?id=${id}`,
    });
};

export const getTechCapabilityProducts = (code: string): AxiosPromise<T.ICapabilityProduct[]> => {
    return Api.get({
        url: `${API_URL}fdm/v2/capabilities/${code}/products`,
    });
};

export const getCoreBusinessCapabilities = (): AxiosPromise<T.IBusinessCapability[]> => {
    return Api.get({ url: `${GATEWAY_URL}capability/v1/business?findBy=CORE` });
};

export const getBusinessCapabilityById = (id: number): AxiosPromise<T.IBusinessCapability> => {
    return Api.get({ url: `${GATEWAY_URL}capability/v1/business/${id}` });
};

export const getTechCapabilityById = (id: number): AxiosPromise<T.ITechCapability> => {
    return Api.get({ url: `${GATEWAY_URL}capability/v1/tech/${id}` });
};

export const getBusinessCapabilityChildren = (
    id: number,
): AxiosPromise<{
    businessCapabilities: T.IBusinessCapability[];
    techCapabilities: T.ITechCapability[];
}> => {
    return Api.get({ url: `${GATEWAY_URL}capability/v1/business/${id}/children` });
};

export const getBusinessCapabilityParents = (id: number): AxiosPromise<T.IParentsData> => {
    return Api.get({ url: `${GATEWAY_URL}capability/v1/business/${id}/parents` });
};

export const getTechCapabilityParents = (id: number): AxiosPromise<T.IParentsData> => {
    return Api.get({ url: `${GATEWAY_URL}capability/v1/tech/${id}/parents` });
};

export const getCapabilitiesBySearch = (
    search: string,
    searchVariant = T.CapabilitySearchVariant.ALL,
): AxiosPromise<T.ISearchResult[]> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/search?findBy=${searchVariant}&search=${search}`,
    });
};

export const putBusinessCapability = (data: T.IBusinessCapabilityForm) => {
    return Api.put({ url: `${GATEWAY_URL}capability/v1/business`, data });
};

export const getSubscribedCapabilities = (
    entityType: T.CapabilitySearchResultTypeVariant,
): AxiosPromise<T.ISubscribedCapabilityData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/capabilities-subscribed?entity-type=${entityType}`,
    });
};
