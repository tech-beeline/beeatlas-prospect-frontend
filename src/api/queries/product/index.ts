import { useQuery } from 'react-query';

import { getUserProducts } from 'api/product';

const PRODUCT_PREFIX = 'PRODUCT_PREFIX';

export const useGetUserProductsQuery = () => {
    return useQuery([PRODUCT_PREFIX, 'ALL'], () =>
        getUserProducts().then((res) => res.data.sort((a, b) => a.name.localeCompare(b.name))),
    );
};
