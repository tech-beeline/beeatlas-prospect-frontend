import React, { FC, useEffect, useState } from 'react';
import { Autocomplete, Search, Select } from '@beeline/design-system-react';

import { useGetBIStatusesQuery } from 'api/queries/bi-library';
import { useGetUserProductsQuery } from 'api/queries/product';
import { useDebounce } from 'hooks';

import { DraftVariants, ProductVariant, StatusVariant } from './const';
import { IBILibraryFilters } from './types';
import * as S from './units';

export const BILibraryFilters: FC<IBILibraryFilters> = ({ filterOptions, setFilterOptions }) => {
    const [search, setSearch] = useState(filterOptions.search);
    const [productFilterText, setProductFilterText] = useState('');
    const debouncedSearch = useDebounce(search);

    const { data: productsData, isLoading: isLoadingProducts } = useGetUserProductsQuery();

    const { data: stagesData, isLoading: isLoadingStages } = useGetBIStatusesQuery();

    const isLoading = isLoadingProducts || isLoadingStages;

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

    const stageOptions = [
        { id: StatusVariant.ALL, value: 'Все' },
        ...(stagesData
            ? stagesData.map((stage) => ({
                  id: stage.id,
                  value: stage.name,
              }))
            : []),
    ];

    const draftOptions = [
        { id: DraftVariants.ALL, value: 'Все' },
        { id: DraftVariants.DRAFT, value: 'Черновик' },
        { id: DraftVariants.PUBLISHED, value: 'Опубликован' },
    ];

    useEffect(() => {
        setFilterOptions({ ...filterOptions, search: debouncedSearch });
    }, [debouncedSearch]);

    return (
        <S.FiltersContainer>
            <Search
                fullWidth
                placeholder="Введите название BI"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch('')}
            />
            <Autocomplete
                fullWidth
                disabled={isLoading}
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
                disabled={isLoading}
                label="Стадия ЖЦ"
                options={stageOptions}
                values={
                    filterOptions.status
                        ? [stageOptions.find((option) => option.id === filterOptions.status)!]
                        : []
                }
                onChange={(values) => setFilterOptions({ ...filterOptions, status: values[0].id })}
            />
            <Select
                fullWidth
                label="Статус"
                options={draftOptions}
                values={
                    filterOptions.draft
                        ? [draftOptions.find((option) => option.id === filterOptions.draft)!]
                        : []
                }
                onChange={(values) => setFilterOptions({ ...filterOptions, draft: values[0].id })}
            />
        </S.FiltersContainer>
    );
};
