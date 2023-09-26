import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
    deleteRole,
    getCurrentRole,
    getRolePermission,
    getRoles,
    postRole,
    putRole,
    putRolePermission,
} from 'api/personal-area';
import { IPermission, IRole } from 'api/personal-area/types';

const ROLE_PREFIX = 'ROLE_PREFIX';

export const useGetAllRolesQuery = () => {
    return useQuery([ROLE_PREFIX, 'roles'], () =>
        getRoles()
            .then((res) => res.data)
            .catch((error) => console.error(error)),
    );
};

export const useGetRoleByIdQuery = (id: number | undefined | null) => {
    return useQuery<IRole>(
        [ROLE_PREFIX, 'role', id],
        () =>
            getCurrentRole(id!)
                .then((res) => res.data)
                .catch((error) => console.error(error)),
        {
            enabled: Boolean(id),
        },
    );
};

export const useGetRolePermissionsByIdQuery = (id: number | undefined | null) => {
    return useQuery<IPermission[]>(
        [ROLE_PREFIX, 'rolePermission', id],
        () =>
            getRolePermission(id!)
                .then((res) => res.data)
                .catch((error) => console.error(error)),
        {
            enabled: Boolean(id),
        },
    );
};

export function useCreateRoleMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [ROLE_PREFIX, 'createRole'],
        (params: IRole) => postRole({ name: params.name }),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(ROLE_PREFIX);
            },
        },
    );
}

export function useUpdateRoleMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [ROLE_PREFIX, 'updateRole'],
        (params: IRole) => putRole({ id: params.id, name: params.name }),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(ROLE_PREFIX);
            },
        },
    );
}

interface IUpdateRolePermissionsParams {
    roleId: number;
    permissions: IPermission[];
}

export function useUpdateRolePermissionsMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [ROLE_PREFIX, 'updateRole'],
        (params: IUpdateRolePermissionsParams) =>
            putRolePermission(params.roleId, params.permissions),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ROLE_PREFIX);
            },
        },
    );
}

export function useDeleteRoleMutation() {
    const queryClient = useQueryClient();
    return useMutation([ROLE_PREFIX, 'deleteRole'], (id: number) => deleteRole(id), {
        onSuccess: () => {
            void queryClient.invalidateQueries(ROLE_PREFIX);
        },
    });
}
