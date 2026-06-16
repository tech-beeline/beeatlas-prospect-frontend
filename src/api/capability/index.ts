import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_AMBASSADOR_URL, GATEWAY_CAPABILITY_URL, GATEWAY_URL } from '../const';

import * as T from './types';

export const getCoreBusinessCapabilities = (): AxiosPromise<T.IBusinessCapability[]> => {
    return Api.get({ url: `${GATEWAY_URL}capability/v1/business?findBy=CORE` });
};

export const getBusinessCapabilityById = (
    id: number | string,
): AxiosPromise<T.IBusinessCapability> => {
    return Api.get({ url: `${GATEWAY_URL}capability/v1/business/${id}` });
};

export const getBusinessCapabilityDomains = (): AxiosPromise<T.IBusinessCapability[]> => {
    return Api.get({ url: `${GATEWAY_URL}capability/v1/business?findBy=DOMAIN` });
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

export const getMapData = (id?: number): AxiosPromise<T.IMapItemData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/business/tree/${id ?? ''}`,
    });
};

export const getPromtByAlias = (alias: string): AxiosPromise<T.IPromtData> => {
    return Api.get({
        url: `${GATEWAY_CAPABILITY_URL}v1/promt/${alias}`,
    });
};

export const postDescriptionByPromt = (
    data: T.IGenerationForm,
): AxiosPromise<T.IGenerationData> => {
    return Api.post({
        url: `${GATEWAY_AMBASSADOR_URL}ai-tool/api/v3/chat/completions`,
        data,
    });
};

export const getCapabilitiesByProductId = (
    id: string,
): AxiosPromise<T.ITechCapabilitiesByProductData> => {
    return Api.get({
        url: `${GATEWAY_CAPABILITY_URL}v1/tech-capabilities/product/${id}`,
    });
};

export const deleteBusinessCapabilityByCode = (code: string) =>
    Api.delete({ url: `${GATEWAY_CAPABILITY_URL}v1/business-capability/${code}` });

export const deleteTechCapabilityByCode = (code: string) =>
    Api.delete({ url: `${GATEWAY_CAPABILITY_URL}v1/tech-capabilities/${code}` });
