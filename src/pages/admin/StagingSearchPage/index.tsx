import React, { useState } from 'react';

import { Text } from 'components/core';
import { Search, Skeleton } from 'components/ui';

import {
    useGetArtifactSearchQuery,
    useGetPipelineArtifactTypesQuery,
} from 'api/queries/staging-service';
import { useDebounce } from 'hooks';

import { SearchCard } from './components';
import * as S from './units';

export const StagingSearchPage = () => {
    const [search, setSearch] = useState('');
    const searchDebounced = useDebounce(search);
    const [selectedArtifactType, setSelectedArtifactType] = useState<string | null>(null);

    const { data: searchData, isLoading: isLoadingSearchData } = useGetArtifactSearchQuery({
        name: encodeURI(searchDebounced),
        artifactTypeId: selectedArtifactType,
    });

    const { data: artifactTypes, isLoading: isLoadingArtifactTypes } =
        useGetPipelineArtifactTypesQuery();

    const artifactTypesOptions = (artifactTypes ?? []).map((artifactType) => ({
        id: String(artifactType.id),
        value: artifactType.name,
    }));

    return (
        <S.PageWrapper>
            <Text variant="h4">Поиск по сущностям staging</Text>
            <S.SearchContainer>
                <Search
                    fullWidth
                    placeholder="Название артефакта"
                    filterPlaceholder="Тип артефакта"
                    disabled={isLoadingArtifactTypes}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => setSearch('')}
                    selectedFilter={artifactTypesOptions.find(
                        (option) => option.id === selectedArtifactType,
                    )}
                    filterItems={artifactTypesOptions}
                    onFilterChange={(value) => setSelectedArtifactType(value?.id ?? null)}
                />
            </S.SearchContainer>
            {isLoadingSearchData &&
                Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} radius={12} height={100} />
                ))}
            {searchData && (
                <>
                    <Text variant="h5">Результаты ({searchData.totalCount})</Text>
                    {searchData.results.map((searchResult) => (
                        <SearchCard
                            key={searchResult.id}
                            searchResult={searchResult}
                            artifactTypes={artifactTypes ?? []}
                        />
                    ))}
                </>
            )}
        </S.PageWrapper>
    );
};
