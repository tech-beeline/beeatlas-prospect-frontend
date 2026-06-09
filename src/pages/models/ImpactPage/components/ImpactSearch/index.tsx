import React, { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { Avatar, Button, Chip, Icon, Search, Skeleton } from 'components/ui';

import { ISearchDeployment, ISearchSystem } from 'api/graph/types';
import { IInfraData } from 'api/product/types';
import { useGetCompleteArchitectureInfoQuery } from 'api/queries/graph';
import { useOutsideClick } from 'hooks/useOutsideClick';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { getHighlightedText } from 'utils/formatters';

import { SearchVariants } from '../../const';

import { IImpactSearch } from './types';
import * as S from './units';

export const ImpactSearch: FC<IImpactSearch> = ({ setBreadcrumbs }) => {
    const [searchVariant, setSearchVariant] = useState<SearchVariants>(SearchVariants.PRODUCT);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParam = searchParams.get('search');
    const [isOpen, setIsOpen] = useState(false);

    const [search, setSearch] = useState('');
    const [searchDebounced] = useState('');

    useEffect(() => {
        setSearch(searchParam ?? '');
    }, [searchParam]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useOutsideClick(dropdownRef, isOpen, setIsOpen, searchRef);

    const handleSystemClick = (system: ISearchSystem) => {
        setSearchParams({ name: system.name, cmdb: system.cmdb });
        setBreadcrumbs([
            {
                name: system.name,
                link: `${R.MODELS_PATH}${R.IMPACT_PATH}?name=${system.name}&cmdb=${system.cmdb}`,
            },
        ]);
        setSearch(system.name);
        setIsOpen(false);
    };

    const handleServerClick = (server: ISearchDeployment) => {
        setSearchParams({
            id: String(server.id),
            name: server.deploymentName,
            cmdb: server.cmdb,
        });
        setBreadcrumbs([
            {
                name: server.deploymentName,
                link: `${R.MODELS_PATH}${R.IMPACT_PATH}?id=${server.id}&name=${server.deploymentName}&cmdb=${server.cmdb}`,
            },
        ]);
        setSearch(server.deploymentName);
        setIsOpen(false);
    };

    const handleInfraClick = (infra: IInfraData) => {
        setSearchParams({
            name: infra.name,
            cmdb: infra.parentSystems[0] ?? '',
        });
        setBreadcrumbs([
            {
                name: infra.name,
                link: `${R.MODELS_PATH}${R.IMPACT_PATH}?name=${infra.name}&cmdb=${
                    infra.parentSystems[0] ?? ''
                }`,
            },
        ]);
        setSearch(infra.name);
        setIsOpen(false);
    };

    const { data, isLoading } = useGetCompleteArchitectureInfoQuery(searchDebounced, false);

    useEffect(() => {
        if (data) {
            if (data.products.length > data.servers.graph.length) {
                setSearchVariant(SearchVariants.PRODUCT);
            } else {
                setSearchVariant(SearchVariants.SERVER);
            }
        }
    }, [data]);

    const handleShowAllClick = () => {
        // setSearchParams({ search: searchDebounced, searchVariant: searchVariant ?? '' });
        setIsOpen(false);
    };

    const handleEnterButtonClick = () => {
        // setSearchDebounced(search);
        setSearchParams({ search });
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
                    placeholder="Название приложения, сервера или endpoint"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    // onFocus={() => setIsOpen(true)}
                    // onClick={() => setIsOpen(true)}
                    onClear={() => setSearch('')}
                    onSearch={handleEnterButtonClick}
                />
            </S.SearchContainer>
            {isOpen && searchDebounced !== '' && (
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
                        <Chip
                            label={`Endpoint (5)`}
                            active={searchVariant === SearchVariants.ENDPOINT}
                            onClick={() => setSearchVariant(SearchVariants.ENDPOINT)}
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
                                                            {system.cmdb}
                                                        </Text>
                                                    </S.SearchCardTextContainer>
                                                </S.SearchCard>
                                            ))}
                                            {data.products.length > 7 && (
                                                <S.ButtonContainer>
                                                    <Button
                                                        variant="plain"
                                                        size="medium"
                                                        onClick={handleShowAllClick}
                                                    >
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
                                                                server.deploymentName.split('~')[0],
                                                                search,
                                                            )}
                                                        </Text>
                                                        <Text inactive variant="body3">
                                                            {server.ip ? `${server.ip}/` : ''}
                                                            {server.host ? `${server.host}/` : ''}
                                                            {server.cmdb ? `${server.cmdb}` : ''}
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
                                                                        КОНТЕКСТНАЯ ДИАГРАММА
                                                                        ВЛАДЕЛЬЦА{' '}
                                                                        {server.parentSystems[0]}
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
                                                    <Button
                                                        variant="plain"
                                                        size="medium"
                                                        onClick={handleShowAllClick}
                                                    >
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
                            {searchVariant === SearchVariants.ENDPOINT && (
                                <>
                                    {data.endpoints.archOperations.length +
                                        data.endpoints.discoveredOperations.length ===
                                        50 && (
                                        <S.BannerContainer>
                                            <Avatar
                                                icon={<Icon iconName={Icons.InfoCircled} />}
                                                color="blue"
                                            />
                                            <Text inactive variant="body3">
                                                Получено свыше 50 результатов. Выбраны наиболее
                                                релевантные. Уточните запрос для узкой выборки
                                            </Text>
                                        </S.BannerContainer>
                                    )}
                                    <S.SubtitleContainer>
                                        <Text inactive variant="subtitle3">
                                            Методы архитектуры
                                        </Text>
                                    </S.SubtitleContainer>
                                    <S.CardsContainer>
                                        <S.EndpointContainer>
                                            <S.EndpointSearchCard>
                                                <Icon iconName={Icons.Search} size="large" />
                                                <S.SearchCardTextGapContainer>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            Деплоймент диаграмма
                                                        </Text>
                                                        <Text variant="body2">
                                                            {getHighlightedText(
                                                                'Structurizr: GET /SSO/USERS ',
                                                                search,
                                                            )}
                                                        </Text>
                                                    </div>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            CMDB
                                                        </Text>
                                                        <Text variant="body2">
                                                            td.mavenir.cms.(centralized management
                                                            system)
                                                        </Text>
                                                    </div>
                                                </S.SearchCardTextGapContainer>
                                                <S.ArrowContainer>
                                                    <Icon
                                                        iconName={Icons.ArrowRight}
                                                        size="large"
                                                    />
                                                </S.ArrowContainer>
                                            </S.EndpointSearchCard>
                                            <S.EndpointServersSearchCard>
                                                <S.SearchCardTextGapContainer>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            СЕРВЕР
                                                        </Text>
                                                        <Text variant="body2">
                                                            <Link
                                                                url="https://beeline.ru"
                                                                title="rich-PROD rich-TEST"
                                                            />
                                                        </Text>
                                                    </div>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            СЕРВЕР
                                                        </Text>
                                                        <Text variant="body2">
                                                            <Link
                                                                url="https://beeline.ru"
                                                                title="rich-PROD rich-TEST"
                                                            />
                                                        </Text>
                                                    </div>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            СЕРВЕР
                                                        </Text>
                                                        <Text variant="body2">
                                                            <Link
                                                                url="https://beeline.ru"
                                                                title="rich-PROD rich-TEST"
                                                            />
                                                        </Text>
                                                    </div>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            СЕРВЕР
                                                        </Text>
                                                        <Text variant="body2">
                                                            <Link
                                                                url="https://beeline.ru"
                                                                title="rich-PROD rich-TEST"
                                                            />
                                                        </Text>
                                                    </div>
                                                </S.SearchCardTextGapContainer>
                                            </S.EndpointServersSearchCard>
                                        </S.EndpointContainer>
                                        <S.EndpointContainer>
                                            <S.EndpointSearchCard>
                                                <Icon iconName={Icons.Search} size="large" />
                                                <S.SearchCardTextGapContainer>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            Деплоймент диаграмма
                                                        </Text>
                                                        <Text variant="body2">
                                                            {getHighlightedText(
                                                                'Structurizr: GET /SSO/USERS ',
                                                                search,
                                                            )}
                                                        </Text>
                                                    </div>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            CMDB
                                                        </Text>
                                                        <Text variant="body2">
                                                            td.mavenir.cms.(centralized management
                                                            system)
                                                        </Text>
                                                    </div>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            Контейнер
                                                        </Text>
                                                        <Text variant="body2">
                                                            ext_langgraph_adapter_for_metric_&_anomaly_search
                                                        </Text>
                                                    </div>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            Интерфейс
                                                        </Text>
                                                        <Text variant="body2">ucp-proxy-api</Text>
                                                    </div>
                                                </S.SearchCardTextGapContainer>
                                                <S.ArrowContainer>
                                                    <Icon
                                                        iconName={Icons.ArrowRight}
                                                        size="large"
                                                    />
                                                </S.ArrowContainer>
                                            </S.EndpointSearchCard>
                                            <S.EndpointServersSearchCard>
                                                <S.SearchCardTextGapContainer>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            СЕРВЕР
                                                        </Text>
                                                        <Text variant="body2">
                                                            <Link
                                                                url="https://beeline.ru"
                                                                title="rich-PROD rich-TEST"
                                                            />
                                                        </Text>
                                                    </div>
                                                    <div>
                                                        <Text inactive variant="overline">
                                                            СЕРВЕР
                                                        </Text>
                                                        <Text variant="body2">
                                                            <Link
                                                                url="https://beeline.ru"
                                                                title="rich-PROD rich-TEST"
                                                            />
                                                        </Text>
                                                    </div>
                                                </S.SearchCardTextGapContainer>
                                            </S.EndpointServersSearchCard>
                                        </S.EndpointContainer>
                                        <S.ButtonContainer>
                                            <Button
                                                variant="plain"
                                                size="medium"
                                                onClick={handleShowAllClick}
                                            >
                                                Посмотреть все результаты
                                            </Button>
                                        </S.ButtonContainer>
                                    </S.CardsContainer>
                                </>
                            )}
                        </>
                    )}
                </S.Dropdown>
            )}
        </S.Container>
    );
};
