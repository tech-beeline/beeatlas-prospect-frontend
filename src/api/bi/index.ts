import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableBooleanParam, formatNullableNumberParam } from 'utils/formatters';

import { API_URL } from '../const';

import * as T from './types';

export const getBIById = (id: string): AxiosPromise<T.IBIData> => {
    return Api.get({
        url: `${API_URL}cx/v1/bi/${id}`,
    });
};

export const getBIEditabilityById = (id: string): AxiosPromise<T.IBIEditabilityData> => {
    return Api.get({
        url: `${API_URL}cx/v1/bi/editability/${id}`,
    });
};

export const getBICollection = (
    search: string,
    productId?: number,
    status?: number,
    draft?: boolean,
): AxiosPromise<T.IBIData[]> => {
    return Api.get({
        url: `${API_URL}cx/v1/bi/find?text=${search}${formatNullableNumberParam(
            'id_product',
            productId,
        )}${formatNullableNumberParam('id_status', status)}${formatNullableBooleanParam(
            'draft',
            draft,
        )}`,
    });
};

export const postBI = (data: T.IBIForm) => {
    return Api.post({
        url: `${API_URL}cx/v1/bi`,
        data,
    });
};

export const patchBI = (id: string, data: T.IBIForm) => {
    return Api.patch({
        url: `${API_URL}cx/v1/bi/${id}`,
        data,
    });
};

export const deleteBI = (id: string) => {
    return Api.delete({
        url: `${API_URL}cx/v1/bi/${id}`,
    });
};
