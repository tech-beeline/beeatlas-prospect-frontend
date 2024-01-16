import React, { FC, useEffect, useState } from 'react';
import { Search, Select } from '@beeline/design-system-react';

import { CJLibraryStatus } from 'api/cj/types';
import { useGetUserProductsQuery } from 'api/queries/product';
import { useDebounce } from 'hooks';

import { ProductVariant } from './const';
import { ICJLibraryFilters } from './types';
import * as S from './units';

export const CJLibraryFilters: FC<ICJLibraryFilters> = ({ filterOptions, setFilterOptions }) => {
    const [search, setSearch] = useState(filterOptions.search);
    const debouncedSearch = useDebounce(search);

    const { data: productsData, isLoading: isLoadingProducts } = useGetUserProductsQuery();

    const productOptions = [
        { id: ProductVariant.ALL, value: 'Все' },
        ...(productsData
            ? productsData.map((product) => ({
                  id: Number(product.id),
                  value: product.name,
              }))
            : []),
    ];

    const draftOptions = [
        { id: CJLibraryStatus.ALL, value: 'Все' },
        { id: CJLibraryStatus.DRAFT, value: 'Черновик' },
        { id: CJLibraryStatus.PUBLISHED, value: 'Опубликован' },
    ];

    useEffect(() => {
        setFilterOptions({ ...filterOptions, search: debouncedSearch });
    }, [debouncedSearch]);

    return (
        <S.FiltersContainer>
            <Search
                fullWidth
                placeholder="Введите название CJ"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch('')}
            />
            <Select
                fullWidth
                disabled={isLoadingProducts}
                label="Продукт"
                options={productOptions}
                values={
                    filterOptions.product
                        ? [productOptions.find((option) => option.id === filterOptions.product)!]
                        : []
                }
                onChange={(values) => setFilterOptions({ ...filterOptions, product: values[0].id })}
            />
            <Select
                fullWidth
                label="Статус"
                options={draftOptions}
                values={
                    filterOptions.status
                        ? [draftOptions.find((option) => option.id === filterOptions.status)!]
                        : []
                }
                onChange={(values) => setFilterOptions({ ...filterOptions, status: values[0].id })}
            />
        </S.FiltersContainer>
    );
};
