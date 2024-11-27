import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableNumberParam, formatNullableStringParam } from 'utils/formatters';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getAllPackages = (
    page?: number,
    perPage?: number,
    status?: string,
): AxiosPromise<T.IPackagesData> => {
    return Api.get({
        url: `${GATEWAY_URL}pack-loader/v1/packages?${formatNullableNumberParam(
            'limit',
            perPage,
        )}${formatNullableNumberParam('offset', page)}${formatNullableStringParam(
            'status',
            status,
        )}`,
    });
};

export const getPackageById = (
    id: string,
    page?: number,
    perPage?: number,
): AxiosPromise<T.IPackageWithParts> => {
    return Api.get({
        url: `${GATEWAY_URL}pack-loader/v1/package/${id}?${formatNullableNumberParam(
            'limit',
            perPage,
        )}${formatNullableNumberParam('offset', page)}`,
    });
};
