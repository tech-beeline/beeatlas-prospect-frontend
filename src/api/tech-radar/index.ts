import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import { ICategory, ITech } from './types';

export const getTechRadar = (): AxiosPromise<ITech[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/tech`,
    });
};

export const getTechRadarCategories = (): AxiosPromise<ICategory[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/category`,
    });
};
