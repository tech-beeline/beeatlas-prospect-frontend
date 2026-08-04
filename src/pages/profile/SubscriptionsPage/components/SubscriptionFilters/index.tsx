import React, { FC } from 'react';

import { Chip, Skeleton } from 'components/ui';

import { useGetSubscriptionEntityTypesQuery } from 'api/queries/subscriptions';

import { FilterVariants } from '../../const';

import { ISubscriptionFilters } from './types';
import * as S from './units';

export const SubscriptionFilters: FC<ISubscriptionFilters> = ({
    search,
    setSearch,
    setPage,
    filterVariant,
    setFilterVariant,
}) => {
    const { data, isLoading } = useGetSubscriptionEntityTypesQuery();

    return (
        <>
            <S.FiltersContainer>
                <S.SearchStyled
                    placeholder="Поиск"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    onClear={() => {
                        setSearch('');
                        setPage(1);
                    }}
                />
            </S.FiltersContainer>
            <S.ChipsContainer>
                <Chip
                    label="Все"
                    active={filterVariant === FilterVariants.ALL}
                    onClick={() => {
                        setFilterVariant(FilterVariants.ALL);
                        setPage(1);
                    }}
                />
                {isLoading &&
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} height={32} width={100} radius={16} />
                    ))}
                {data &&
                    data.map((entity) => (
                        <Chip
                            key={entity.id}
                            label={entity.alias}
                            active={filterVariant === entity.type}
                            onClick={() => {
                                setFilterVariant(entity.type);
                                setPage(1);
                            }}
                        />
                    ))}
            </S.ChipsContainer>
        </>
    );
};
