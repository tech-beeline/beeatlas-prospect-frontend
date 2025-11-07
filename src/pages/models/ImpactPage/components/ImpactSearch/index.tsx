import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Chip, Icon, Search, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';

import { ISearchDeployment, ISearchSystem } from 'api/graph/types';
import { useGetSearchDeploymentsQuery, useGetSearchSystemsQuery } from 'api/queries/graph';
import { useDebounce } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';

import { CHIPS, SearchVariants, searchVariantToPlaceholderMap } from './const';
import * as S from './units';

export const ImpactSearch = () => {
    const [searchVariant, setSearchVariant] = useState(SearchVariants.SYSTEM);
    const [, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const searchDebounced = useDebounce(search);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useOutsideClick(dropdownRef, isOpen, setIsOpen, searchRef);

    const handleSystemClick = (system: ISearchSystem) => {
        setSearchParams({ name: system.name, cmdb: system.cmdb });
        setSearch(system.name);
        setIsOpen(false);
    };

    const handleServerClick = (server: ISearchDeployment) => {
        setSearchParams({
            environmentName: server.environmentName,
            deploymentName: server.deploymentName,
            cmdb: server.cmdb,
        });
        setSearch(server.deploymentName);
        setIsOpen(false);
    };

    const { data: systemsData, isLoading: isLoadingSystemsData } = useGetSearchSystemsQuery({
        search: searchDebounced,
        enabled: searchVariant === SearchVariants.SYSTEM,
    });

    const { data: serverData, isLoading: isLoadingServerData } = useGetSearchDeploymentsQuery({
        search: searchDebounced,
        enabled: searchVariant === SearchVariants.SERVER,
    });

    const handleEnterButtonClick = () => {
        if (searchVariant === SearchVariants.SYSTEM && systemsData && systemsData[0]) {
            handleSystemClick(systemsData[0]);
        } else if (searchVariant === SearchVariants.SERVER && serverData && serverData[0]) {
            handleServerClick(serverData[0]);
        } else {
            setSearchParams({ notFound: 'true' });
            setIsOpen(false);
        }
    };

    return (
        <S.Container>
            <Search
                fullWidth
                ref={searchRef}
                placeholder={searchVariantToPlaceholderMap[searchVariant]}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onClick={() => setIsOpen(true)}
                onClear={() => setSearch('')}
                onSearch={handleEnterButtonClick}
            />
            {isOpen && (
                <S.Dropdown ref={dropdownRef}>
                    <Text variant="overline">Выбери категорию, в которой будем искать</Text>
                    <S.ChipsContainer>
                        {CHIPS.map((chip) => (
                            <Chip
                                key={chip.value}
                                label={chip.label}
                                active={searchVariant === chip.value}
                                onClick={() => setSearchVariant(chip.value)}
                            />
                        ))}
                    </S.ChipsContainer>
                    {searchVariant === SearchVariants.SYSTEM && (
                        <>
                            {isLoadingSystemsData && (
                                <S.SkeletonContainer>
                                    <Skeleton radius={12} height={40} />
                                    <Skeleton radius={12} height={40} />
                                </S.SkeletonContainer>
                            )}
                            {systemsData && (
                                <S.CardsContainer>
                                    {systemsData.map((system) => (
                                        <S.SearchCard
                                            key={system.cmdb}
                                            onClick={() => handleSystemClick(system)}
                                        >
                                            <Icon iconName={Icons.Search} size="large" />
                                            <Text variant="body2">{system.name}</Text>
                                        </S.SearchCard>
                                    ))}
                                </S.CardsContainer>
                            )}
                            {systemsData && systemsData.length === 0 && (
                                <NotFoundBlock
                                    setMinSize={false}
                                    smallImage
                                    imageVariant={ImageVariants.SEARCH}
                                    title="Нет результатов, подходящих под параметры поиска"
                                    text="Попробуйте изменить запрос"
                                />
                            )}
                        </>
                    )}
                    {searchVariant === SearchVariants.SERVER && (
                        <>
                            {isLoadingServerData && (
                                <S.SkeletonContainer>
                                    <Skeleton radius={12} height={40} />
                                    <Skeleton radius={12} height={40} />
                                </S.SkeletonContainer>
                            )}
                            {serverData && (
                                <S.CardsContainer>
                                    {serverData.map((server) => (
                                        <S.SearchCard
                                            key={server.cmdb}
                                            onClick={() => handleServerClick(server)}
                                        >
                                            <Icon iconName={Icons.Search} size="large" />
                                            <Text variant="body2">{server.deploymentName}</Text>
                                        </S.SearchCard>
                                    ))}
                                </S.CardsContainer>
                            )}
                            {serverData && serverData.length === 0 && (
                                <NotFoundBlock
                                    setMinSize={false}
                                    smallImage
                                    imageVariant={ImageVariants.SEARCH}
                                    title="Нет результатов, подходящих под параметры поиска"
                                    text="Попробуйте изменить запрос"
                                />
                            )}
                        </>
                    )}
                </S.Dropdown>
            )}
        </S.Container>
    );
};
