import { useQuery } from 'react-query';

import { getTechRadar, getTechRadarCategories } from 'api/tech-radar';
import { ICategory, ITech } from 'api/tech-radar/types';

const TECHRADAR_PREFIX = 'TECHRADAR_PREFIX';

export const useGetTechradarDataQuery = () => {
    return useQuery<ITech[]>([TECHRADAR_PREFIX, 'tech'], () =>
        getTechRadar().then((res) => res.data),
    );
};

export const useGetTechradarCategoriesQuery = () => {
    return useQuery<ICategory[]>([TECHRADAR_PREFIX, 'categories'], () =>
        getTechRadarCategories().then((res) => res.data),
    );
};
