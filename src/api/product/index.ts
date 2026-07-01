import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableStringParam } from 'utils/formatters';

import {
    GATEWAY_CAPABILITY_URL,
    GATEWAY_FF_URL,
    GATEWAY_PRODUCT_URL,
    GATEWAY_STRUCTURIZR_URL,
    GATEWAY_URL,
} from '../const';

import * as T from './types';

export const getUserProducts = (ids: number[]): AxiosPromise<T.IProductData[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/by-ids`,
        params: {
            ids: ids.join(','),
        },
    });
};

export const getUserProductsKeyById = (id: number): AxiosPromise<T.IStructurizrKey> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/${id}/structurizr-key`,
    });
};

export const getProductsByTechnologyId = (id: number): AxiosPromise<T.IProductData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/tech/${id}/product`,
    });
};

export const getProductStructurizrContainerByCmdb = (
    cmdb: string,
): AxiosPromise<T.IStructurizrContainerData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/product/${cmdb}/container?show-hidden=true`,
    });
};

export const getProductStructurizrInterfacesByCmdb = (
    cmdb: string,
): AxiosPromise<T.IStructurizrInterfaceData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/product/${cmdb}/interface/arch`,
    });
};

export const getProductMapicInterfacesByCmdb = (
    cmdb: string,
): AxiosPromise<T.IMapicInterfaceData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/product/${cmdb}/interface/mapic`,
    });
};

export const postConnectionInterface = (data: T.IConnectionInterfaceForm) => {
    return Api.post({
        url: `${GATEWAY_URL}product/v1/connection/interface`,
        data,
    });
};

export const getProductFitnessFunctionsByCmdb = (
    cmdb: string,
): AxiosPromise<T.ICompleteFitnessFunctionsData> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/${cmdb}/fitness-function`,
    });
};

export const getAllProducts = (): AxiosPromise<T.IFullProductData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/product/info`,
    });
};

export const getProductInfoByCmdb = (cmdb: string): AxiosPromise<T.IFullProductData> => {
    return Api.get({
        url: `${GATEWAY_URL}product/v1/product/${cmdb}/info`,
    });
};

export const putProductByCmdb = (data: T.IProductForm) => {
    return Api.put({
        url: `${GATEWAY_PRODUCT_URL}v1/product`,
        data,
    });
};

export const getEntityParent = (id: string, type: string): AxiosPromise<T.IParent> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/parent?${formatNullableStringParam(
            'id',
            id,
        )}${formatNullableStringParam('type', type)}`,
    });
};

export const postStructurizrWorkspace = (data: T.IStructurizrWorkspaceForm) => {
    return Api.post({
        url: `${GATEWAY_STRUCTURIZR_URL}workspace`,
        data,
    });
};

export const getDeploymentInfluence = (cmdb: string): AxiosPromise<T.ISystemInfluence> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/deployment/${cmdb}/influence`,
    });
};

export const getSystemE2E = (cmdb: string): AxiosPromise<T.ISystemE2E[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/${cmdb}/e2e`,
    });
};

export const getSystemTC = (id: string | number): AxiosPromise<T.ISystemTC> => {
    return Api.get({
        url: `${GATEWAY_CAPABILITY_URL}v1/tech-capabilities/product/${id}`,
    });
};

export const getSystemInfrastrucutre = (search: string): AxiosPromise<T.IInfraData[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/infra/contains?name=${search}`,
    });
};

export const getSystemInfrastrucutreByIp = (search: string): AxiosPromise<T.IInfraData[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/infra/search?parameter="vimIp"&value=${search}`,
    });
};

export const getProductEmployeesByCmdb = (cmdb: string): AxiosPromise<T.IEmployee[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/${cmdb}/employee`,
    });
};

export const getProductAliasAvailability = (
    cmdb: string,
): AxiosPromise<{ isUniqAlias: boolean }> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/${cmdb}/free`,
    });
};

export const getProductPatterns = (alias: string): AxiosPromise<T.IProductPattern[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/product/${alias}/patterns`,
    });
};

export const getProductTechnologies = (code: string): AxiosPromise<T.IProductTechnology> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v2/product/${code}/info`,
    });
};

export const getOperationsByTechCapabilityId = (
    id: string,
): AxiosPromise<T.IOperationContainer[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/operation/tech-capability/${id}`,
    });
};

export const deleteProductById = (id: string) => {
    return Api.delete({
        url: `${GATEWAY_PRODUCT_URL}v1/product/${id}`,
    });
};

export const getFitnessFunctionsAggregation =
    (): AxiosPromise<T.IFitnessFunctionsAggregationResult> => {
        return Api.get({
            url: `${GATEWAY_PRODUCT_URL}v1/dashboard/fitness-function`,
        });
    };

export const getAllChapters = (): AxiosPromise<T.IChapter[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/chapter`,
    });
};

export const getNfrsByPatternId = (
    id: string | number,
): AxiosPromise<T.INonFunctionalRequirement[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/requirement/pattern/${id}`,
    });
};

export const getNfrById = (
    id: string | number,
): AxiosPromise<T.INonFunctionalRequirementFullData> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v2/nfr/${id}`,
    });
};

export const getNfrsByProductId = (
    id: string | number,
): AxiosPromise<T.INonFunctionalRequirementFullData[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/nfr/product?id=${id}`,
    });
};

export const getNfrsByProductAlias = (
    alias: string,
): AxiosPromise<T.INonFunctionalRequirementFullData[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v2/nfr/product?alias=${alias}`,
    });
};

export const postNfrsToProductById = (
    productId: string | number,
    nfrIds: number[],
): AxiosPromise<void> => {
    return Api.post({
        url: `${GATEWAY_PRODUCT_URL}v1/nfr/product?id=${productId}`,
        data: nfrIds,
    });
};

export const postNfrsToProductByAlias = (alias: string, nfrIds: number[]): AxiosPromise<void> => {
    return Api.post({
        url: `${GATEWAY_PRODUCT_URL}v1/nfr/product?alias=${alias}`,
        data: nfrIds,
    });
};

export const deleteNfrFromProduct = (nfrId: number | string, alias: string): AxiosPromise<void> => {
    return Api.delete({
        url: `${GATEWAY_PRODUCT_URL}v1/nfr/${nfrId}/product?alias=${alias}`,
    });
};

export const getNfr = (): AxiosPromise<T.INonFunctionalRequirement[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/nfr`,
    });
};

export const postLifeSituation = (data: T.ILifeSituationForm): AxiosPromise<{ id: number }> => {
    return Api.post({
        url: `${GATEWAY_PRODUCT_URL}v1/chapter`,
        data,
    });
};

export const patchLifeSituation = (id: number, data: T.ILifeSituationForm) => {
    return Api.patch({
        url: `${GATEWAY_PRODUCT_URL}v1/chapter?id=${id}`,
        data,
    });
};

export const getFitnessFunctions = (): AxiosPromise<T.IFitnessFunctionData[]> => {
    return Api.get({
        url: `${GATEWAY_FF_URL}v1/fitness-functions`,
    });
};

export const postNFR = (data: T.INFRForm): AxiosPromise<{ coreId: number; versionId: number }> => {
    return Api.post({
        url: `${GATEWAY_PRODUCT_URL}v2/requirement`,
        data,
    });
};

export const postNFRVersion = (
    code: string,
    data: T.INFRForm,
): AxiosPromise<{ versionId: number }> => {
    return Api.post({
        url: `${GATEWAY_PRODUCT_URL}v2/requirement/version?code=${code}`,
        data,
    });
};

export const getNFRByPatternId = (
    id: string | number | null,
): AxiosPromise<T.INonFunctionalRequirement[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/requirement/pattern/${id}`,
    });
};
