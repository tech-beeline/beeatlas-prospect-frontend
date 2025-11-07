import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getAllProducts,
    getProductInfoByCmdb,
    getProductMapicInterfacesByCmdb,
    getProductsByTechnologyId,
    getProductStructurizrContainerByCmdb,
    getProductStructurizrInterfacesByCmdb,
    getUserProducts,
    postConnectionInterface,
    postStructurizrWorkspace,
} from 'api/product';
import { IConnectionInterfaceForm, IStructurizrWorkspaceForm } from 'api/product/types';

const PRODUCT_PREFIX = 'PRODUCT_PREFIX';

export const useGetUserProductsQuery = () => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'USER', 'ALL'],
        queryFn: () =>
            getUserProducts().then((res) => res.data.sort((a, b) => a.name.localeCompare(b.name))),
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
