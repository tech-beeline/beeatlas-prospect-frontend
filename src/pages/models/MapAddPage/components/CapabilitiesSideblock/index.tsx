import React, { FC, useState } from 'react';
import { Search, Skeleton } from '@beeline/design-system-react';

import { CapabilitySearchResultTypeVariant } from 'api/capability/types';
import { useGetCapabilitiesQuery, useGetCoreCapabilitiesQuery } from 'api/queries/capability';
import { useDebounce } from 'hooks';

import { CapabilitiesSearchCard, CapabilitiesTreeCard } from './components';
import { ICapabilitiesSideblock } from './types';
import * as S from './units';

export const CapabilitiesSideblock: FC<ICapabilitiesSideblock> = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);

    const { data: searchData, isLoading: isLoadingSearchData } = useGetCapabilitiesQuery({
        search: debouncedSearch,
    });

    const { data: capabilitiesData, isLoading: isLoadingCapabilities } =
        useGetCoreCapabilitiesQuery();

    return (
        <S.Container>
            <Search
                fullWidth
                placeholder="Введите название или код"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch('')}
            />
            {search !== '' && (
                <S.SearchResultContainer>
                    {isLoadingSearchData && (
                        <S.SearchSkeletonContainer>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} height={36} radius={12} />
                            ))}
                        </S.SearchSkeletonContainer>
                    )}
                    {searchData &&
                        searchData.map((capability) => (
                            <CapabilitiesSearchCard key={capability.id} capability={capability} />
                        ))}
                </S.SearchResultContainer>
            )}
            {search === '' && (
                <S.SearchResultContainer>
                    {isLoadingCapabilities && (
                        <S.SearchSkeletonContainer>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} height={36} radius={12} />
                            ))}
                        </S.SearchSkeletonContainer>
                    )}
                    {capabilitiesData &&
                        capabilitiesData.map((capability) => (
                            <CapabilitiesTreeCard
                                key={capability.id}
                                type={CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY}
                                capability={capability}
                                level={0}
                            />
                        ))}
                </S.SearchResultContainer>
            )}
        </S.Container>
    );
};
