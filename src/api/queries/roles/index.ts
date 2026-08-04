import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    deleteRole,
    getRoleById,
    getRolePermission,
    getRoles,
    patchRole,
    postRole,
    putRolePermission,
} from 'api/personal-area';
import { IPermission, IRole } from 'api/personal-area/types';

const ROLE_PREFIX = 'ROLE_PREFIX';

export const useGetAllRolesQuery = () => {
    return useQuery({
        queryKey: [ROLE_PREFIX, 'roles'],
        queryFn: () => getRoles().then((res) => res.data),
    });
};

export const useGetRoleByIdQuery = (id: number | undefined | null) => {
    return useQuery<IRole>({
        queryKey: [ROLE_PREFIX, 'role', id],
        queryFn: () =>
            getRoleById(id!)
                .then((res) => res.data)
                .catch((error) => console.error(error)),
        enabled: Boolean(id),
    });
};

export const useGetRolePermissionsByIdQuery = (id: number | undefined | null) => {
    return useQuery<IPermission[]>({
        queryKey: [ROLE_PREFIX, 'rolePermission', id],
        queryFn: () =>
            getRolePermission(id!)
                .then((res) => res.data)
                .catch((error) => console.error(error)),
        enabled: Boolean(id),
    });
};

export function useCreateRoleMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [ROLE_PREFIX, 'createRole'],
        mutationFn: (params: IRole) => postRole({ name: params.name }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ROLE_PREFIX] });
        },
    });
}

export function useUpdateRoleMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [ROLE_PREFIX, 'updateRole'],
        mutationFn: (params: IRole) => patchRole({ id: params.id, name: params.name }),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [ROLE_PREFIX] });
        },
    });
}

interface IUpdateRolePermissionsParams {
    roleId: number;
    permissions: IPermission[];
}

export function useUpdateRolePermissionsMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [ROLE_PREFIX, 'updateRole'],
        mutationFn: (params: IUpdateRolePermissionsParams) =>
            putRolePermission(params.roleId, params.permissions),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ROLE_PREFIX] });
        },
    });
}

export function useDeleteRoleMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [ROLE_PREFIX, 'deleteRole'],
        mutationFn: (id: number) => deleteRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ROLE_PREFIX] });
        },
    });
}
