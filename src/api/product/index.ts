import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getUserProducts = (): AxiosPromise<T.IProductData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/user/product`,
    });
};

export const getProductsByTechnologyId = (id: number): AxiosPromise<T.IProductData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/tech/${id}/product`,
    });
};
