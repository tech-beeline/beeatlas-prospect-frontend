import { useQuery } from 'react-query';

import { getProfiles } from 'api/personal-area';

const PROFILE_PREFIX = 'PROFILE_PREFIX';

export const useGetProfilesQuery = () => {
    return useQuery([PROFILE_PREFIX, 'ALL'], () => getProfiles().then((res) => res.data));
};
