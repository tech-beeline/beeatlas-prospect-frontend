import React, { useMemo, useRef, useState } from 'react';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Button, Icon, Skeleton } from 'components/ui';

import { useGetFitnessFunctionsAggregationQuery } from 'api/queries/product';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { AnalyticalTableHandle } from './components/AnalyticalTable';
import { IFilterOptions } from './components/Filters/types';
import { AnalyticalTable, Filters } from './components';
import * as S from './units';
import {
    filterFitnessFunctionsAggregation,
    getAutoExpandedDomainIds,
    getDashboardData,
} from './utils';

export const AnalyticalPage = () => {
    const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
        search: '',
        product: [],
        domain: [],
        fitnessFunctions: [],
        hideEmpty: false,
    });

    const { data, isLoading } = useGetFitnessFunctionsAggregationQuery();
    const tableRef = useRef<AnalyticalTableHandle | null>(null);

    const filteredFitnessFunctionsData = useMemo(() => {
        if (!data) return undefined;
        return filterFitnessFunctionsAggregation({
            data,
            selectedDomainIds: new Set(filterOptions.domain),
            selectedProductIds: new Set(filterOptions.product.map((id) => String(id))),
            selectedFitnessFunctionIds: new Set(filterOptions.fitnessFunctions),
            hideEmpty: filterOptions.hideEmpty,
        });
    }, [
        data,
        filterOptions.domain,
        filterOptions.product,
        filterOptions.hideEmpty,
        filterOptions.fitnessFunctions,
    ]);

    const { correctProductsCount, correctProductsPercent, totalProductsCount } = useMemo(
        () => getDashboardData(filteredFitnessFunctionsData),
        [filteredFitnessFunctionsData],
    );

    const autoExpandedDomainIds = useMemo(() => {
        if (!filteredFitnessFunctionsData) return [];

        if (filterOptions.product.length === 0) return filterOptions.domain;
        return getAutoExpandedDomainIds({
            filteredData: filteredFitnessFunctionsData,
            selectedDomainIds: filterOptions.domain,
            selectedProductIds: filterOptions.product.map((id) => String(id)),
        });
    }, [filteredFitnessFunctionsData, filterOptions.domain, filterOptions.product]);

    return (
        <S.PageWrapper>
            <S.TitleWrapper>
                <Text variant="h4">Аналитический отчет фитнес-функций</Text>
                <Button
                    startIcon={<Icon iconName={Icons.ShareIos} />}
                    onClick={() => tableRef.current?.exportToExcel()}
                    disabled={!filteredFitnessFunctionsData}
                >
                    Экспорт
                </Button>
            </S.TitleWrapper>

            <Filters
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                fitnessFunctionsData={data}
                isLoading={isLoading}
            />

            <S.CardsContainer>
                {isLoading ? (
                    <>
                        <Skeleton height={48} radius={12} width={278} />
                        <Skeleton height={48} radius={12} width={278} />
                        <Skeleton height={48} radius={12} width={278} />
                    </>
                ) : (
                    <>
                        <S.Card>
                            <Text variant="h5">{totalProductsCount}</Text>
                            <Text inactive variant="subtitle3">
                                Всего приложений
                            </Text>
                        </S.Card>
                        <S.Card>
                            <Text variant="h5">{correctProductsCount}</Text>
                            <Text inactive variant="subtitle3">
                                Корректных приложений
                            </Text>
                        </S.Card>
                        <S.Card>
                            <Text variant="h5">{correctProductsPercent}%</Text>
                            <Text inactive variant="subtitle3">
                                Корректных приложений
                            </Text>
                        </S.Card>
                    </>
                )}
            </S.CardsContainer>

            {filteredFitnessFunctionsData &&
                (totalProductsCount && totalProductsCount > 0 ? (
                    <AnalyticalTable
                        ref={tableRef}
                        fitnessFunctionsData={filteredFitnessFunctionsData}
                        autoExpandedDomainIds={autoExpandedDomainIds}
                    />
                ) : (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="Нет результатов, подходящих под параметры поиска"
                            text="Попробуйте изменить запрос"
                        />
                    </S.NotFoundContainer>
                ))}
            {isLoading && <Skeleton height={200} radius={12} />}
        </S.PageWrapper>
    );
};
