import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { API_URL } from '../const';

import * as T from './types';

export const getUserProducts = (): AxiosPromise<T.IProductData[]> => {
    return Api.get({
        url: `${API_URL}user/product`,
    });
};
