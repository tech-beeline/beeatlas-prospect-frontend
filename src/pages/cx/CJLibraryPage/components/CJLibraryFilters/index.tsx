import React, { FC, useEffect, useState } from 'react';
import { Autocomplete, Search, Select } from '@beeline/design-system-react';

import { CJLibraryStatus } from 'api/cj/types';
import { useGetUserProductsQuery } from 'api/queries/product';
import { useDebounce } from 'hooks';

import { ProductVariant } from './const';
import { ICJLibraryFilters } from './types';
import * as S from './units';

export const CJLibraryFilters: FC<ICJLibraryFilters> = ({ filterOptions, setFilterOptions }) => {
    const [search, setSearch] = useState(filterOptions.search);
    const [productFilterText, setProductFilterText] = useState('');
    const debouncedSearch = useDebounce(search);

    const { data: productsData, isLoading: isLoadingProducts } = useGetUserProductsQuery();

    const productOptions = [
        { id: ProductVariant.ALL, value: 'Все' },
        ...(productsData
            ? productsData
                  .filter((product) =>
                      product.name.toLowerCase().includes(productFilterText.toLowerCase()),
                  )
                  .map((product) => ({
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
            <Autocomplete
                fullWidth
                disabled={isLoadingProducts}
                label="Продукт"
                options={productOptions}
                renderValue={(v) => v.value}
                type="select"
                value={productOptions.find((option) => option.id === filterOptions.product) ?? null}
                onChange={(value) => {
                    setProductFilterText('');
                    setFilterOptions({
                        ...filterOptions,
                        product:
                            value.id === ProductVariant.ALL ? ProductVariant.ALL : Number(value.id),
                    });
                }}
                onInputChange={(v) => {
                    setProductFilterText(v);
                    setFilterOptions({ ...filterOptions, product: null });
                }}
                onInputClear={() => {
                    setProductFilterText('');
                    setFilterOptions({ ...filterOptions, product: null });
                }}
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
