import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getProfiles, putProfileRoles } from 'api/personal-area';

const PROFILE_PREFIX = 'PROFILE_PREFIX';

export const useGetProfilesQuery = () => {
    return useQuery([PROFILE_PREFIX, 'ALL'], () => getProfiles().then((res) => res.data));
};

interface IUpdateProfileRolesParams {
    login: string;
    roles: { id: number }[];
}

export function useUpdateProfileRolesMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [PROFILE_PREFIX, 'updateRole'],
        (params: IUpdateProfileRolesParams) => putProfileRoles(params.login, params.roles),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(PROFILE_PREFIX);
            },
        },
    );
}
