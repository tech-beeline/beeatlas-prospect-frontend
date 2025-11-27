import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Chip, Icon, Search, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';

import { ISearchDeployment, ISearchSystem } from 'api/graph/types';
import { IInfraData } from 'api/product/types';
import { useGetCompleteArchitectureInfoQuery } from 'api/queries/graph';
import { useDebounce } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';

import { SearchVariants } from './const';
import * as S from './units';
import { getHighlightedText } from './utils';

export const ImpactSearch = () => {
    const [searchVariant, setSearchVariant] = useState<SearchVariants | null>(null);
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
            id: String(server.id),
            name: server.deploymentName,
            cmdb: server.cmdb,
        });
        setSearch(server.deploymentName);
        setIsOpen(false);
    };

    const handleInfraClick = (infra: IInfraData) => {
        setSearchParams({
            name: infra.name,
            cmdb: infra.parents[0] ?? '',
        });
        setSearch(infra.name);
        setIsOpen(false);
    };

    const { data, isLoading } = useGetCompleteArchitectureInfoQuery(searchDebounced);

    useEffect(() => {
        if (data) {
            if (data.products.length > data.servers.graph.length) {
                setSearchVariant(SearchVariants.PRODUCT);
            } else {
                setSearchVariant(SearchVariants.SERVER);
            }
        }
    }, [data]);

    const handleEnterButtonClick = () => {
        // if (searchVariant === SearchVariants.SYSTEM && systemsData && systemsData[0]) {
        //     handleSystemClick(systemsData[0]);
        // } else if (searchVariant === SearchVariants.SERVER && serverData && serverData[0]) {
        //     handleServerClick(serverData[0]);
        // } else {
        //     setSearchParams({ notFound: 'true' });
        //     setIsOpen(false);
        // }
    };

    return (
        <S.Container>
            <S.SearchContainer>
                <Search
                    fullWidth
                    ref={searchRef}
                    placeholder="Имя/мнемоника приложения CMDB, мнемоника экземплара CMDB, имя сервиса, endpoint или сервера"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    onClick={() => setIsOpen(true)}
                    onClear={() => setSearch('')}
                    onSearch={handleEnterButtonClick}
                />
                <Button
                    variant="plain"
                    disabled={!search}
                    size="medium"
                    onClick={() => setSearch('')}
                >
                    Сбросить
                </Button>
            </S.SearchContainer>
            {isOpen && (
                <S.Dropdown ref={dropdownRef}>
                    <Text inactive variant="subtitle3">
                        Категории
                    </Text>
                    <S.ChipsContainer>
                        <Chip
                            label={`Приложение${
                                data?.products ? ` (${data.products.length})` : ''
                            }`}
                            active={searchVariant === SearchVariants.PRODUCT}
                            onClick={() => setSearchVariant(SearchVariants.PRODUCT)}
                        />
                        <Chip
                            label={`Сервер${
                                data?.servers
                                    ? ` (${data.servers.graph.length + data.servers.cmdb.length})`
                                    : ''
                            }`}
                            active={searchVariant === SearchVariants.SERVER}
                            onClick={() => setSearchVariant(SearchVariants.SERVER)}
                        />
                    </S.ChipsContainer>
                    {isLoading && (
                        <S.SkeletonContainer>
                            {Array.from({ length: 2 }).map((_, i) => (
                                <Skeleton key={i} radius={12} height={40} />
                            ))}
                        </S.SkeletonContainer>
                    )}
                    {data && (
                        <>
                            {searchVariant === SearchVariants.PRODUCT && (
                                <>
                                    {data.products && (
                                        <S.CardsContainer>
                                            {data.products.slice(0, 7).map((system) => (
                                                <S.SearchCard
                                                    key={system.cmdb}
                                                    onClick={() => handleSystemClick(system)}
                                                >
                                                    <Icon iconName={Icons.Search} size="large" />
                                                    <S.SearchCardTextContainer>
                                                        <Text inactive variant="overline">
                                                            КОНТЕКСТНАЯ ДИАГРАММА
                                                        </Text>
                                                        <Text variant="body2">
                                                            {getHighlightedText(
                                                                system.name,
                                                                search,
                                                            )}
                                                        </Text>
                                                        <Text inactive variant="body3">
                                                            Имя элемента/Продукт элемента
                                                        </Text>
                                                    </S.SearchCardTextContainer>
                                                </S.SearchCard>
                                            ))}
                                            {data.products.length > 7 && (
                                                <S.ButtonContainer>
                                                    <Button variant="plain" size="medium">
                                                        Посмотреть все результаты
                                                    </Button>
                                                </S.ButtonContainer>
                                            )}
                                        </S.CardsContainer>
                                    )}
                                    {data.products.length === 0 && (
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
                                    {data.servers && (
                                        <S.CardsContainer>
                                            {data.servers.graph.length > 0 && (
                                                <S.SubtitleContainer>
                                                    <Text inactive variant="subtitle3">
                                                        Graph
                                                    </Text>
                                                </S.SubtitleContainer>
                                            )}
                                            {data.servers.graph.slice(0, 7).map((server) => (
                                                <S.SearchCard
                                                    key={server.cmdb}
                                                    onClick={() => handleServerClick(server)}
                                                >
                                                    <Icon iconName={Icons.Search} size="large" />
                                                    <S.SearchCardTextContainer>
                                                        <Text inactive variant="overline">
                                                            ДЕПЛОЙМЕНТ ДИАГРАММА
                                                        </Text>
                                                        <Text variant="body2">
                                                            {getHighlightedText(
                                                                server.deploymentName,
                                                                search,
                                                            )}
                                                        </Text>
                                                        <Text inactive variant="body3">
                                                            IP/Host сервера/Имя элемента/Продукт
                                                            элемента
                                                        </Text>
                                                    </S.SearchCardTextContainer>
                                                </S.SearchCard>
                                            ))}
                                            {data.servers.graph.length < 7 && (
                                                <>
                                                    {data.servers.cmdb.length > 0 && (
                                                        <S.SubtitleContainer>
                                                            <Text inactive variant="subtitle3">
                                                                Cmdb
                                                            </Text>
                                                        </S.SubtitleContainer>
                                                    )}
                                                    {data.servers.cmdb
                                                        .slice(0, 7 - data.servers.graph.length)
                                                        .map((server) => (
                                                            <S.SearchCard
                                                                key={server.name}
                                                                onClick={() =>
                                                                    handleInfraClick(server)
                                                                }
                                                            >
                                                                <Icon
                                                                    iconName={Icons.Search}
                                                                    size="large"
                                                                />
                                                                <S.SearchCardTextContainer>
                                                                    <Text
                                                                        inactive
                                                                        variant="overline"
                                                                    >
                                                                        ДЕПЛОЙМЕНТ ДИАГРАММА
                                                                    </Text>
                                                                    <Text variant="body2">
                                                                        {getHighlightedText(
                                                                            server.name,
                                                                            search,
                                                                        )}
                                                                    </Text>
                                                                    <Text inactive variant="body3">
                                                                        IP/Host сервера/Имя
                                                                        элемента/Продукт элемента
                                                                    </Text>
                                                                </S.SearchCardTextContainer>
                                                            </S.SearchCard>
                                                        ))}
                                                </>
                                            )}
                                            {data.servers.graph.length + data.servers.cmdb.length >
                                                7 && (
                                                <S.ButtonContainer>
                                                    <Button variant="plain" size="medium">
                                                        Посмотреть все результаты
                                                    </Button>
                                                </S.ButtonContainer>
                                            )}
                                        </S.CardsContainer>
                                    )}
                                    {data.servers.graph.length + data.servers.cmdb.length === 0 && (
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
                        </>
                    )}
                </S.Dropdown>
            )}
        </S.Container>
    );
};
