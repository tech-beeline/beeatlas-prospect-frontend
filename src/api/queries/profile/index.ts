import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getProfiles, putProfileRoles } from 'api/personal-area';

const PROFILE_PREFIX = 'PROFILE_PREFIX';

export const useGetProfilesQuery = () => {
    return useQuery({
        queryKey: [PROFILE_PREFIX, 'ALL'],
        queryFn: () => getProfiles().then((res) => res.data),
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
