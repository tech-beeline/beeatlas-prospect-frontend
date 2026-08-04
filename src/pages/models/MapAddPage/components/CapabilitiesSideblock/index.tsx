import React, { FC, useState } from 'react';

import { Search } from 'components/ui';
import { Skeleton } from 'components/ui';

import { CapabilitySearchResultTypeVariant, CapabilitySearchVariant } from 'api/capability/types';
import { PersonalMapTypes } from 'api/maps/types';
import { useGetCapabilitiesQuery, useGetCoreCapabilitiesQuery } from 'api/queries/capability';
import { useDebounce } from 'hooks';

import { CapabilitiesSearchCard, CapabilitiesTreeCard } from './components';
import { ICapabilitiesSideblock } from './types';
import * as S from './units';

export const CapabilitiesSideblock: FC<ICapabilitiesSideblock> = ({
    mapType,
    selectedCapabilitiesIds,
}) => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);

    const { data: searchData, isLoading: isLoadingSearchData } = useGetCapabilitiesQuery({
        search: debouncedSearch,
        searchVariant:
            mapType.name === PersonalMapTypes.TECH_CAPABILITY
                ? CapabilitySearchVariant.TECH_CAPABILITY
                : CapabilitySearchVariant.BUSINESS_CAPABILITY,
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
                            <CapabilitiesSearchCard
                                key={capability.id}
                                mapType={mapType}
                                capability={capability}
                                selectedCapabilitiesIds={selectedCapabilitiesIds}
                            />
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
                                mapType={mapType}
                                type={CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY}
                                capability={capability}
                                selectedCapabilitiesIds={selectedCapabilitiesIds}
                                level={0}
                            />
                        ))}
                </S.SearchResultContainer>
            )}
        </S.Container>
    );
};
