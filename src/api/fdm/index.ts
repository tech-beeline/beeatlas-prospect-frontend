import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { API_URL } from '../const';

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
