import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from 'features/auth';

import { getProfileRoles, getProfiles, putProfileRoles } from 'api/personal-area';

const PROFILE_PREFIX = 'PROFILE_PREFIX';

export const useGetProfilesQuery = () => {
    return useQuery({
        queryKey: [PROFILE_PREFIX, 'ALL'],
        queryFn: () => getProfiles().then((res) => res.data),
    });
};

export const useGetMyRolesQuery = () => {
    return useQuery({
        queryKey: [PROFILE_PREFIX, 'myRoles'],
        queryFn: () => {
            const { userInfo } = useAuthStore.getState();
            return getProfileRoles(userInfo?.sub ?? '').then((res) => res.data);
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
};

interface IUpdateProfileRolesParams {
    login: string;
    roles: { id: number }[];
}

export function useUpdateProfileRolesMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [PROFILE_PREFIX, 'updateRole'],
        mutationFn: (params: IUpdateProfileRolesParams) =>
            putProfileRoles(params.login, params.roles),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROFILE_PREFIX] });
        },
    });
}
