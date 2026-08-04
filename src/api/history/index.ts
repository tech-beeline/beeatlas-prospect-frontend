import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getBusinessCapabilityVersions = (
    capabilityId: string,
): AxiosPromise<T.ICapabilityVersionInfo[]> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/business/history/${capabilityId}`,
    });
};

export const getTechCapabilityVersions = (
    capabilityId: string,
): AxiosPromise<T.ICapabilityVersionInfo[]> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/tech/history/${capabilityId}`,
    });
};

export const getBusinessCapabilityVersionsComparsion = (
    capabilityId: string,
    version: number,
    otherVersion?: number,
): AxiosPromise<T.IBusinessCapabilityVersion[]> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/business/history/compare/${capabilityId}/${version}${
            otherVersion ? `?other_version=${otherVersion}` : ''
        }`,
    });
};

export const getTechCapabilityVersionsComparsion = (
    capabilityId: string,
    version: number,
    otherVersion?: number,
): AxiosPromise<T.ITechCapabilityVersion[]> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/tech/history/compare/${capabilityId}/${version}${
            otherVersion ? `?other_version=${otherVersion}` : ''
        }`,
    });
};
