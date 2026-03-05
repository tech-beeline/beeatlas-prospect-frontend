import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    deleteProductById,
    getAllProducts,
    getDeploymentInfluence,
    getOperationsByTechCapabilityId,
    getProductEmployeesByCmdb,
    getProductFitnessFunctionsByCmdb,
    getProductInfoByCmdb,
    getProductMapicInterfacesByCmdb,
    getProductsByTechnologyId,
    getProductStructurizrContainerByCmdb,
    getProductStructurizrInterfacesByCmdb,
    getSystemE2E,
    getSystemTC,
    getUserProducts,
    getUserProductsKeyById,
    postConnectionInterface,
    postStructurizrWorkspace,
    putProductByCmdb,
} from 'api/product';
import {
    IConnectionInterfaceForm,
    IProductForm,
    IStructurizrWorkspaceForm,
} from 'api/product/types';

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
