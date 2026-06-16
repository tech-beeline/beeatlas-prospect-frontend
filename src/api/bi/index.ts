import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableBooleanParam, formatNullableNumberParam } from 'utils/formatters';

import {
    GATEWAY_CAPABILITY_URL,
    GATEWAY_CX_URL,
    GATEWAY_SEQUENCE_DIAGRAM_URL,
    GATEWAY_URL,
} from '../const';

import * as T from './types';

export const getBIById = (id: string): AxiosPromise<T.IBIData> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v2/bi/${id}`,
    });
};

export const getBIEditabilityById = (id: string): AxiosPromise<T.IBIEditabilityData> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v1/bi/editability/${id}`,
    });
};

export const getBICollection = (
    search: string,
    productId?: number,
    status?: number,
    draft?: boolean,
): AxiosPromise<T.IBIData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v1/bi/find?text=${search}${formatNullableNumberParam(
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
        url: `${GATEWAY_URL}cx/v1/bi`,
        data,
    });
};

export const patchBI = (id: string, data: Partial<T.IBIForm>) => {
    return Api.patch({
        url: `${GATEWAY_URL}cx/v1/bi/${id}`,
        data,
    });
};

export const patchSLABI = (id: string, data: T.ISLAForm) => {
    return Api.patch({
        url: `${GATEWAY_CX_URL}cx/v1/library/business-interactions/step/${id}`,
        data,
    });
};

export const putStepRelationsBI = (id: string, data: T.IRelationForm[]) => {
    return Api.put({
        url: `${GATEWAY_CX_URL}cx/v1/library/business-interactions/step/${id}/relation`,
        data,
    });
};

export const getTechCapibility = (): AxiosPromise<T.ITechCapability[]> => {
    return Api.get({
        url: `${GATEWAY_CAPABILITY_URL}v1/tech-capabilities`,
    });
};

export const deleteBI = (id: string) => {
    return Api.delete({
        url: `${GATEWAY_URL}cx/v1/bi/${id}`,
    });
};

export const getSequenceDiagram = (productAlias: string, TCCode: string): AxiosPromise<string> => {
    return Api.get({
        url: `${GATEWAY_SEQUENCE_DIAGRAM_URL}svg?id=${productAlias}&key=${TCCode}`,
    });
};

export const getPlantUML = (productAlias: string, TCCode: string): AxiosPromise<string> => {
    return Api.get({
        url: `${GATEWAY_SEQUENCE_DIAGRAM_URL}plantuml?id=${productAlias}&key=${TCCode}`,
    });
};
