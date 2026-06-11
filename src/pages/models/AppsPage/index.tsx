import React, { useMemo, useState } from 'react';
import { OldVersionBanner } from 'features/apps';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { Search } from 'components/ui';
import { Button, Skeleton, TableBody, TableData, TableHead, TableRow } from 'components/ui';

import {
    useGetAllProductsQuery,
    useGetFitnessFunctionsAggregationQuery,
} from 'api/queries/product';
import { useDebounce } from 'hooks';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import * as S from './units';

export const AppsPage = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);

    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery();
    const { data: fitnessAggregationData, isLoading: isLoadingFitnessAggregation } =
        useGetFitnessFunctionsAggregationQuery();

    const isLoading = isLoadingProducts || isLoadingFitnessAggregation;

    const fitnessStatsByAlias = useMemo(() => {
        if (!fitnessAggregationData) return {};

        const total = fitnessAggregationData.fitnessFunctionEnum.length;

        return Object.fromEntries(
            fitnessAggregationData.domain.flatMap((d) =>
                d.product.map((p) => {
                    const checked = p.fitnessFunctions.reduce(
                        (count, ff) => count + (ff.isCheck ? 1 : 0),
                        0,
                    );

                    return [
                        p.alias,
                        {
                            total,
                            checked,
                            percent: total ? (checked / total) * 100 : 0,
                        },
                    ];
                }),
            ),
        );
    }, [fitnessAggregationData]);

    const filteredProducts = (productsData ?? []).filter(
        (product) =>
            product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            product.alias.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );

    return (
        <S.PageWrapper>
            <S.Container>
                {window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false && <OldVersionBanner />}
                <S.Header>
                    <Text variant="h4">Каталог приложений</Text>
                </S.Header>

                <S.SearchContainer>
                    <Search
                        fullWidth
                        placeholder="Название приложения или CMDB мнемоника"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        value={search}
                        onClear={() => setSearch('')}
                    />
                    <Button variant="plain" disabled={!search} onClick={() => setSearch('')}>
                        Сбросить
                    </Button>
                </S.SearchContainer>

                {isLoading && <Skeleton height={200} radius={12} />}
                {!isLoading && filteredProducts.length !== 0 && (
                    <S.TableStyled>
                        <TableHead>
                            <TableRow>
                                <S.TableHeaderDataStyled>Приложение</S.TableHeaderDataStyled>
                                <S.TableHeaderDataStyled>
                                    CMDB&nbsp;Мнемоника
                                </S.TableHeaderDataStyled>
                                <S.TableHeaderDataStyled>
                                    Structurizr&nbsp;OnPremises
                                </S.TableHeaderDataStyled>
                                <S.TableHeaderDataStyled>Фитнес-функций</S.TableHeaderDataStyled>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableData>
                                        <Link
                                            outer={false}
                                            title={product.name}
                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${product.alias}`}
                                        />
                                    </TableData>
                                    <TableData>{product.alias}</TableData>
                                    <TableData>
                                        {product.structurizrApiUrl ? (
                                            <Link url={product.structurizrApiUrl} />
                                        ) : (
                                            formatNullableString(null)
                                        )}
                                    </TableData>
                                    <TableData alignRight={true}>
                                        {fitnessStatsByAlias[product.alias]?.total ? (
                                            <span>
                                                {fitnessStatsByAlias[
                                                    product.alias
                                                ].percent.toFixed()}
                                                %
                                            </span>
                                        ) : (
                                            formatNullableString(null)
                                        )}
                                    </TableData>
                                </TableRow>
                            ))}
                        </TableBody>
                    </S.TableStyled>
                )}
                {!isLoading && filteredProducts.length === 0 && (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            imageVariant={ImageVariants.SEARCH}
                            title="Нет результатов, подходящих под параметры поиска"
                            text="Попробуйте изменить запрос"
                        />
                    </S.NotFoundContainer>
                )}
            </S.Container>
        </S.PageWrapper>
    );
};
