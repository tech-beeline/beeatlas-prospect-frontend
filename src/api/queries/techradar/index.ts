import { useQuery } from 'react-query';

import { getTechRadar } from 'api/tech-radar';

const TECHRADAR_PREFIX = 'TECHRADAR_PREFIX';

export const useGetTechradarDataQuery = () => {
    return useQuery([TECHRADAR_PREFIX], () =>
        getTechRadar()
            .then((res) => res.data)
            .catch((error) => console.error(error)),
    );
};
