import React, { FC, useEffect, useState } from 'react';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { ButtonGroup, Skeleton } from 'components/ui';

import { useGetCompleteArchitectureInfoQuery } from 'api/queries/graph';

import { SearchVariants } from '../../const';

import { EndpointSearchResults, ProductSearchResults, ServerSearchResults } from './components';
import { ISearchResults } from './types';
import * as S from './units';

export const SearchResults: FC<ISearchResults> = ({ search, setBreadcrumbs, visitedPages }) => {
    const [searchVariant, setSearchVariant] = useState<SearchVariants | null>(
        SearchVariants.PRODUCT,
    );

    const { data, isLoading } = useGetCompleteArchitectureInfoQuery(search);

    const productsLength = data?.products.length;
    const serversLength = data ? data.servers.graph.length + data.servers.cmdb.length : undefined;
    const endpointsLength = data
        ? data.endpoints.archOperations.length + data.endpoints.discoveredOperations.length
        : undefined;

    useEffect(() => {
        if (data) {
            if (productsLength === 0 && serversLength === 0 && endpointsLength === 0) {
                setSearchVariant(null);
            } else if (productsLength! > serversLength! && productsLength! > endpointsLength!) {
                setSearchVariant(SearchVariants.PRODUCT);
            } else if (serversLength! > endpointsLength!) {
                setSearchVariant(SearchVariants.SERVER);
            } else {
                setSearchVariant(SearchVariants.ENDPOINT);
            }
        }
    }, [data]);

    return (
        <>
            <Text variant="h5">Результаты поиска</Text>
            <Text inactive variant="subtitle3">
                Категории
            </Text>
            <S.CategoriesContainer>
                {searchVariant && (
                    <ButtonGroup
                        alwaysSelected
                        size="small"
                        type="secondary"
                        options={[
                            {
                                label: `Приложение${
                                    data?.products ? ` (${data.products.length})` : ''
                                }`,
                                id: SearchVariants.PRODUCT,
                                disabled: data && productsLength === 0,
                            },
                            {
                                label: `Сервер${
                                    data?.servers
                                        ? ` (${
                                              data.servers.graph.length + data.servers.cmdb.length
                                          })`
                                        : ''
                                }`,
                                id: SearchVariants.SERVER,
                                disabled: data && serversLength === 0,
                            },
                            {
                                label: `Endpoint${
                                    data?.endpoints
                                        ? ` (${
                                              data.endpoints.archOperations.length +
                                              data.endpoints.discoveredOperations.length
                                          })`
                                        : ''
                                }`,
                                id: SearchVariants.ENDPOINT,
                                disabled: data && endpointsLength === 0,
                            },
                        ]}
                        selectedOption={{
                            id: searchVariant,
                        }}
                        onChange={(option) => setSearchVariant(option.id as SearchVariants)}
                    />
                )}
            </S.CategoriesContainer>
            {isLoading && (
                <S.SkeletonContainer>
                    {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} radius={12} height={60} />
                    ))}
                </S.SkeletonContainer>
            )}
            {!isLoading && searchVariant === null && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.SEARCH}
                        title="Нет результатов, подходящих под параметры поиска"
                        text="Попробуйте изменить запрос"
                    />
                </S.NotFoundContainer>
            )}
            {searchVariant === SearchVariants.PRODUCT && data && (
                <ProductSearchResults
                    products={data.products}
                    search={search}
                    setBreadcrumbs={setBreadcrumbs}
                    visitedPages={visitedPages}
                />
            )}
            {searchVariant === SearchVariants.SERVER && data && (
                <ServerSearchResults
                    servers={data.servers}
                    search={search}
                    setBreadcrumbs={setBreadcrumbs}
                    visitedPages={visitedPages}
                />
            )}
            {searchVariant === SearchVariants.ENDPOINT && data && (
                <EndpointSearchResults
                    endpoints={data.endpoints}
                    search={search}
                    setBreadcrumbs={setBreadcrumbs}
                    visitedPages={visitedPages}
                />
            )}
        </>
    );
};
