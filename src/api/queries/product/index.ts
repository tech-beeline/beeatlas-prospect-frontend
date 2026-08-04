import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    deleteNfrFromProduct,
    deleteProductById,
    getAllChapters,
    getAllProducts,
    getDeploymentInfluence,
    getFitnessFunctions,
    getFitnessFunctionsAggregation,
    getNfr,
    getNfrById,
    getNFRByPatternId,
    getNfrsByPatternId,
    getNfrsByProductAlias,
    getNfrsByProductId,
    getOperationsByTechCapabilityId,
    getProductEmployeesByCmdb,
    getProductFitnessFunctionsByCmdb,
    getProductInfoByCmdb,
    getProductMapicInterfacesByCmdb,
    getProductPatterns,
    getProductsByTechnologyId,
    getProductStructurizrContainerByCmdb,
    getProductStructurizrInterfacesByCmdb,
    getProductTechnologies,
    getSystemE2E,
    getSystemTC,
    getUserProducts,
    getUserProductsKeyById,
    patchLifeSituation,
    postConnectionInterface,
    postLifeSituation,
    postNFR,
    postNfrsToProductByAlias,
    postNfrsToProductById,
    postNFRVersion,
    postStructurizrWorkspace,
    putProductByCmdb,
} from 'api/product';
import {
    IConnectionInterfaceForm,
    ILifeSituationForm,
    INFRForm,
    IProductForm,
    IStructurizrWorkspaceForm,
} from 'api/product/types';
import { getUserInfo } from 'api/user';

const PRODUCT_PREFIX = 'PRODUCT_PREFIX';

export const useGetUserProductsQuery = (ids: number[]) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'user', 'BY_IDS', ids],
        queryFn: () =>
            getUserProducts(ids).then((res) =>
                res.data.sort((a, b) => a.name.localeCompare(b.name)),
            ),
    });
};

export const useGetUserProductsKeyById = (id?: number, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'user', 'key', id],
        queryFn: () => getUserProductsKeyById(id!).then((res) => res.data),
        enabled: !!id && options?.enabled !== false,
    });
};

export const useGetProductsByTechnologyIdQuery = (id?: number) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'tech', id],
        queryFn: () => getProductsByTechnologyId(id!).then((res) => res.data),
        enabled: !!id,
    });
};

export const useGetProductStructurizrContainerByCmdbQuery = (cmdb?: string | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'cmdb', cmdb, 'container'],
        queryFn: () => getProductStructurizrContainerByCmdb(cmdb!).then((res) => res.data),
        enabled: !!cmdb,
    });
};

export const useGetProductStructurizrInterfacesByCmdbQuery = (cmdb?: string | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'cmdb', cmdb, 'structurizr'],
        queryFn: () => getProductStructurizrInterfacesByCmdb(cmdb!).then((res) => res.data),
        enabled: !!cmdb,
    });
};

export const useGetProductMapicInterfacesByCmdbQuery = (cmdb?: string | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'cmdb', cmdb, 'mapic'],
        queryFn: () => getProductMapicInterfacesByCmdb(cmdb!).then((res) => res.data),
        enabled: !!cmdb,
    });
};

export const useGetProductFitnessFunctionsByCmdbQuery = (cmdb?: string | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'cmdb', cmdb, 'fitness-functions'],
        queryFn: () => getProductFitnessFunctionsByCmdb(cmdb!).then((res) => res.data),
        enabled: !!cmdb,
    });
};

export function useCreateConnectionInterfaceMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PRODUCT_PREFIX, 'create'],
        mutationFn: (params: IConnectionInterfaceForm) => postConnectionInterface(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_PREFIX] });
        },
    });
}

export const useGetAllProductsQuery = () => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'ALL'],
        queryFn: () => getAllProducts().then((res) => res.data),
    });
};

export const useGetProductInfoByCmdbQuery = (cmdb: string | undefined | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'INFO', cmdb],
        queryFn: () => getProductInfoByCmdb(cmdb!).then((res) => res.data),
        enabled: !!cmdb,
    });
};

interface IUpdateProductParams {
    data: IProductForm;
}
export function useUpdateProductByCmdbMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PRODUCT_PREFIX, 'create', 'product'],
        mutationFn: (params: IUpdateProductParams) => putProductByCmdb(params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_PREFIX] });
        },
    });
}

export const useCreateStructurizrWorkspaceMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PRODUCT_PREFIX, 'create_structurizr_workspace'],
        mutationFn: (params: IStructurizrWorkspaceForm) => postStructurizrWorkspace(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_PREFIX] });
        },
    });
};

interface IGetDeploymentInfluenceParams {
    cmdb: string;
    enabled: boolean;
}
export const useGetDeploymentInfluenceQuery = (params: IGetDeploymentInfluenceParams) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'deployment', 'influence', params.cmdb],
        queryFn: () => getDeploymentInfluence(params.cmdb).then((res) => res.data),
        enabled: params.enabled,
    });
};

export const useGetSystemE2EQuery = (cmdb: string | undefined | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'system', 'e2e', cmdb],
        queryFn: () => getSystemE2E(cmdb!).then((res) => res.data),
        enabled: !!cmdb,
    });
};

export const useGetSystemTCQuery = (cmdb: string | undefined | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'system', 'tc', cmdb],
        queryFn: async () => {
            const { id } = await getProductInfoByCmdb(cmdb!).then((res) => res.data);
            return getSystemTC(id).then((res) => res.data);
        },
        enabled: !!cmdb,
    });
};

export const useGetSystemTCByIdQuery = (id: string | number | undefined | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'system', 'tc', 'id', id],
        queryFn: async () => {
            return getSystemTC(id!).then((res) => [
                ...res.data.implemented,
                ...res.data.responsibility,
            ]);
        },
        enabled: !!id,
    });
};

interface IGetProductEmployeesParams {
    cmdb: string;
    enabled: boolean;
}
export const useGetProductEmployeesByCmdbQuery = (params: IGetProductEmployeesParams) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'EMPLOYEES', params.cmdb],
        queryFn: () => getProductEmployeesByCmdb(params.cmdb).then((res) => res.data),
        enabled: params.enabled,
    });
};

export const useGetOperationsByTechCapabilityQuery = (
    id: string | undefined | null,
    enabled = true,
) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'OPERATIONS', 'TC', id],
        queryFn: () => getOperationsByTechCapabilityId(id!).then((res) => res.data),
        enabled: enabled && !!id,
    });
};

export function useDeleteProductByIdMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PRODUCT_PREFIX, 'delete'],
        mutationFn: (id: string) => deleteProductById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_PREFIX] });
        },
    });
}

export const useGetFitnessFunctionsAggregationQuery = () => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'FITNESS_FUNCTIONS'],
        queryFn: () => getFitnessFunctionsAggregation().then((res) => res.data),
    });
};

export const useGetProductPatternsQuery = (alias?: string | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'patterns', alias],
        queryFn: () => getProductPatterns(alias!).then((res) => res.data),
        enabled: !!alias,
    });
};

export const useGetProductTechnologiesQuery = (code?: string | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'technologies', code],
        queryFn: () => getProductTechnologies(code!).then((res) => res.data),
        enabled: !!code,
    });
};

export const useGetAllChaptersQuery = () => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'chapters'],
        queryFn: () => getAllChapters().then((res) => res.data),
    });
};

export const useGetNfrsByPatternIdQuery = (id: string | number, enabled = true) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'nfrs', 'pattern', id],
        queryFn: () => getNfrsByPatternId(id).then((res) => res.data),
        enabled,
    });
};

export const useGetNFRByIdQuery = (id: string | number) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'nfr', id],
        queryFn: () => getNfrById(id).then((res) => res.data),
        enabled: !!id,
    });
};

export const useGetUserProductsWithNfrsQuery = () => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'user', 'WITH_NFRS'],
        queryFn: async () => {
            const userInfo = await getUserInfo().then((res) => res.data);
            const productsData = await getUserProducts(userInfo.productsIds).then(
                (res) => res.data,
            );
            const nfrsData = await Promise.all(
                productsData.map((product) =>
                    getNfrsByProductId(product.id).then((res) => res.data),
                ),
            );
            return productsData.map((product, i) => ({
                ...product,
                nfrs: nfrsData[i],
            }));
        },
    });
};

type IPostByIdsParams = {
    productId: string | number;
    nfrIds: number[];
};
type IPostByAliasParams = {
    productAlias: string;
    nfrIds: number[];
};
type IPostNfrsToProductParams = IPostByIdsParams | IPostByAliasParams;

export const usePostNfrsToProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [PRODUCT_PREFIX, 'post_nfrs_to_product'],
        mutationFn: (params: IPostNfrsToProductParams) =>
            'productId' in params
                ? postNfrsToProductById(params.productId, params.nfrIds)
                : postNfrsToProductByAlias(params.productAlias, params.nfrIds),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_PREFIX] });
        },
    });
};

export const useGetNfrsByProductAliasQuery = (alias?: string | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'nfrs', 'product', alias],
        queryFn: () => getNfrsByProductAlias(alias!).then((res) => res.data),
        enabled: !!alias,
    });
};

interface IDeleteNfrFromProductParams {
    nfrId: number | string;
    alias: string;
}
export const useDeleteNfrFromProductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PRODUCT_PREFIX, 'delete_nfr_from_product'],
        mutationFn: (params: IDeleteNfrFromProductParams) =>
            deleteNfrFromProduct(params.nfrId, params.alias),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_PREFIX] });
        },
    });
};

export const useGetNfr = () => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'nfr'],
        queryFn: () => getNfr().then((res) => res.data),
    });
};

export function useCreateLifeSituationMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PRODUCT_PREFIX, 'create', 'life-situation'],
        mutationFn: (params: ILifeSituationForm) =>
            postLifeSituation(params).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_PREFIX, 'chapters'] });
        },
    });
}

interface IPatchLifeSituationParams {
    id: number;
    data: ILifeSituationForm;
}

export function usePatchLifeSituationMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PRODUCT_PREFIX, 'patch', 'life-situation'],
        mutationFn: ({ id, data }: IPatchLifeSituationParams) =>
            patchLifeSituation(id, data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_PREFIX, 'chapters'] });
        },
    });
}

export const useGetFitnessFunctions = () => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'fitness-functions'],
        queryFn: () => getFitnessFunctions().then((res) => res.data),
    });
};

export const usePostNFRMutation = () => {
    return useMutation({
        mutationKey: [PRODUCT_PREFIX, 'create', 'nfr'],
        mutationFn: (params: INFRForm) => postNFR(params).then((res) => res.data),
    });
};

interface IPostNFRVersionParams {
    code: string;
    data: INFRForm;
}

export const usePostNFRVersionMutation = () => {
    return useMutation({
        mutationKey: [PRODUCT_PREFIX, 'create', 'nfr', 'version'],
        mutationFn: ({ code, data }: IPostNFRVersionParams) =>
            postNFRVersion(code, data).then((res) => res.data),
    });
};

export const useGetNFRByPatternIdQuery = (id: string | number | null) => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'nfr', 'pattern', id],
        queryFn: () => getNFRByPatternId(id).then((res) => res.data),
        enabled: !!id,
    });
};
