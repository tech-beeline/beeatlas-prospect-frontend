import { type Option } from 'components/ui';

import { IFullProductData } from 'api/product/types';

const matchesSearch = (value: string, search: string) =>
    value.toLocaleLowerCase('ru').includes(search.trim().toLocaleLowerCase('ru'));

export const getProductOptions = (products: IFullProductData[], search: string): Option<string>[] =>
    products
        .map((product) => ({ id: product.alias, value: `${product.name} (${product.alias})` }))
        .filter((option) => matchesSearch(option.value, search));
