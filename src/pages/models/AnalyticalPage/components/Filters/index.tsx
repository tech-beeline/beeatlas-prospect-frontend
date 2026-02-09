import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Search, Select, Switch } from '@beeline/design-system-react';

import { Text } from 'components/core';

import { IFitnessFunctionDomain, IFitnessFunctionProductData } from 'api/product/types';

import { IFilters, ISearchResultItem, SearchResultType } from './types';
import * as S from './units';

export const Filters: FC<IFilters> = ({
    filterOptions,
    setFilterOptions,
    fitnessFunctionsData,
}) => {
    const [search, setSearch] = useState(filterOptions.search);
    const [menuOpened, setMenuOpened] = useState(false);

    const domains: IFitnessFunctionDomain[] = useMemo(
        () => fitnessFunctionsData?.domain ?? [],
        [fitnessFunctionsData],
    );

    const allProducts: IFitnessFunctionProductData[] = useMemo(
        () =>
            domains.reduce<IFitnessFunctionProductData[]>(
                (acc, domain) => acc.concat(domain.product),
                [],
            ),
        [domains],
    );

    const availableProducts: IFitnessFunctionProductData[] = useMemo(() => {
        if (filterOptions.domain.length === 0) return allProducts;

        const selectedDomainIds = new Set(filterOptions.domain);
        return domains
            .filter((domain) => selectedDomainIds.has(domain.id))
            .reduce<IFitnessFunctionProductData[]>((acc, domain) => acc.concat(domain.product), []);
    }, [allProducts, domains, filterOptions.domain]);

    const domainOptions = useMemo(
        () =>
            domains.map((domain) => ({
                id: domain.id,
                value: domain.name,
            })),
        [domains],
    );

    const productOptions = useMemo(
        () =>
            availableProducts.map((product) => ({
                id: product.id,
                value: product.name,
                alias: product.alias,
            })),
        [availableProducts],
    );

    const selectedDomainOptions = domainOptions.filter((option) =>
        filterOptions.domain.includes(option.id),
    );

    const selectedProductOptions = productOptions.filter((option) =>
        filterOptions.product.includes(String(option.id)),
    );

    const hasActiveFilters =
        filterOptions.search.trim() !== '' ||
        filterOptions.product.length > 0 ||
        filterOptions.domain.length > 0 ||
        filterOptions.hideEmpty;

    const searchResults: ISearchResultItem[] = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (query.length < 3) {
            return [];
        }

        const domainResults: ISearchResultItem[] = domains
            .filter((domain) => domain.name.toLowerCase().includes(query))
            .map((domain) => ({
                type: SearchResultType.DOMAIN,
                id: domain.id,
                label: `Блок: ${domain.name}`,
            }));

        const productResults: ISearchResultItem[] = availableProducts
            .filter(
                (product) =>
                    product.name.toLowerCase().includes(query) ||
                    product.alias.toLowerCase().includes(query),
            )
            .map((product) => ({
                type: SearchResultType.PRODUCT,
                id: product.id,
                label: `Продукт: ${product.name}`,
            }));

        return [...domainResults, ...productResults];
    }, [search, domains, availableProducts]);

    useEffect(() => {
        setFilterOptions((prev) => ({ ...prev, search }));
    }, [search]);

    useEffect(() => {
        const allowedIds = new Set(availableProducts.map((p) => String(p.id)));
        setFilterOptions((prev) => {
            const nextSelectedProducts = prev.product.filter((id) => allowedIds.has(id));
            if (nextSelectedProducts.length === prev.product.length) return prev;
            return { ...prev, product: nextSelectedProducts };
        });
    }, [availableProducts, setFilterOptions]);

    const handleBlocksChange = (options: Array<{ id: number; value: string }>) => {
        const domainIds = options.map((opt) => opt.id);
        setFilterOptions((prev) => ({ ...prev, domain: domainIds }));
    };

    const handleProductsChange = (options: Array<{ id: number; value: string }>) => {
        const productIds = options.map((opt) => String(opt.id));
        setFilterOptions((prev) => ({ ...prev, product: productIds }));
    };

    const handleResetClick = () => {
        setSearch('');
        setFilterOptions(() => ({
            product: [],
            domain: [],
            search: '',
            hideEmpty: false,
        }));
    };

    const handleSearchClear = () => {
        setSearch('');
    };

    const handleSearchResultClick = (item: ISearchResultItem) => {
        if (item.type === 'DOMAIN') {
            setFilterOptions((prev) => ({ ...prev, domain: [item.id] }));
        }

        if (item.type === 'PRODUCT') {
            setFilterOptions((prev) => ({ ...prev, product: [String(item.id)] }));
        }

        setSearch(item.label);
    };

    return (
        <S.FiltersWrapper>
            <S.SearchContainer>
                <Search
                    fullWidth
                    placeholder="Название блока, приложения или cmdb мнемоника"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={handleSearchClear}
                    onFocus={() => setMenuOpened(true)}
                    onBlur={() => setMenuOpened(false)}
                />
                {menuOpened && search.length >= 3 && (
                    <S.MenuBlock>
                        {searchResults.map((item, index) => (
                            <S.MenuItem
                                key={`${item.type}-${item.id}-${index}`}
                                onMouseDown={() => handleSearchResultClick(item)}
                            >
                                {item.label}
                            </S.MenuItem>
                        ))}
                        {searchResults.length === 0 && (
                            <S.MenuItem>
                                <Text inactive variant="subtitle3">
                                    Нет совпадений
                                </Text>
                            </S.MenuItem>
                        )}
                    </S.MenuBlock>
                )}
            </S.SearchContainer>

            <div />

            <S.FlexContainer>
                <S.FlexGrowContainer>
                    <Select
                        fullWidth
                        placeholder="Блок"
                        multiple
                        filter
                        options={domainOptions}
                        values={selectedDomainOptions}
                        onChange={handleBlocksChange}
                    />
                </S.FlexGrowContainer>

                <S.FlexGrowContainer>
                    <Select
                        fullWidth
                        placeholder="Приложение"
                        multiple
                        filter
                        filterFunction={(options, query) =>
                            options.filter(
                                (option) =>
                                    option.value.value
                                        .toLowerCase()
                                        .includes(query.toLowerCase()) ||
                                    option.value.alias.toLowerCase().includes(query.toLowerCase()),
                            )
                        }
                        options={productOptions}
                        values={selectedProductOptions}
                        onChange={handleProductsChange}
                    />
                </S.FlexGrowContainer>
            </S.FlexContainer>

            <S.FlexContainer>
                <Switch
                    label="Скрыть приложения без ФФ"
                    checked={filterOptions.hideEmpty}
                    onChange={(e) =>
                        setFilterOptions({
                            ...filterOptions,
                            hideEmpty: e.target.checked,
                        })
                    }
                />
                <Button
                    disabled={!hasActiveFilters}
                    onClick={handleResetClick}
                    variant="plain"
                    size="small"
                >
                    Сбросить
                </Button>
            </S.FlexContainer>
        </S.FiltersWrapper>
    );
};
