import { useQuery } from '@tanstack/react-query';

import { getUserProducts } from 'api/product';

const PRODUCT_PREFIX = 'PRODUCT_PREFIX';

export const useGetUserProductsQuery = () => {
    return useQuery({
        queryKey: [PRODUCT_PREFIX, 'ALL'],
        queryFn: () =>
            getUserProducts().then((res) => res.data.sort((a, b) => a.name.localeCompare(b.name))),
    });
};
