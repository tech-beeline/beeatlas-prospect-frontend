import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { API_URL, CAPABILITIES_URL } from '../const';

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

export const getTechCapabilityProducts = (guid: string): AxiosPromise<T.ICapabilityProduct[]> => {
    return Api.get({
        url: `${API_URL}fdm/v1/capabilities/${guid}/products`,
    });
};

export const getCoreBusinessCapabilities = (): AxiosPromise<T.IBusinessCapability[]> => {
    return Api.get({ url: `${CAPABILITIES_URL}v1/business-capability?findBy=CORE` });
};

export const getBusinessCapabilityById = (id: number): AxiosPromise<T.IBusinessCapability> => {
    return Api.get({ url: `${CAPABILITIES_URL}v1/business-capability/${id}` });
};

export const getBusinessCapabilityChildren = (
    id: number,
): AxiosPromise<{
    businessCapabilities: T.IBusinessCapability[];
    techCapabilities: T.ITechCapability[];
}> => {
    return Api.get({ url: `${CAPABILITIES_URL}v1/business-capability/${id}/children` });
};

export const getBusinessCapabilityParents = (id: number): AxiosPromise<T.IParentsData> => {
    return Api.get({ url: `${CAPABILITIES_URL}v1/business-capability/${id}/parents` });
};

export const getTechCapabilityParents = (id: number): AxiosPromise<T.IParentsData> => {
    return Api.get({ url: `${CAPABILITIES_URL}v1/tech-capabilities/${id}/parents` });
};

export const getCapabilitiesBySearch = (
    search: string,
    searchVariant = T.CapabilitySearchVariant.ALL,
): AxiosPromise<T.ISearchResult[]> => {
    return Api.get({ url: `${CAPABILITIES_URL}v1/find?findBy=${searchVariant}&search=${search}` });
};

export const putBusinessCapability = (data: T.IBusinessCapabilityForm) => {
    return Api.put({ url: `${CAPABILITIES_URL}v1/business-capability`, data });
};
