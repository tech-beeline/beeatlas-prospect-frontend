import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { Avatar, Chip, Icon, Pagination, Skeleton } from 'components/ui';

import { ISearchDeployment, ISearchSystem } from 'api/graph/types';
import { IInfraData } from 'api/product/types';
import { useGetCompleteArchitectureInfoQuery } from 'api/queries/graph';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { getHighlightedText } from 'utils/formatters';

import { OperationTypes, SearchVariants } from '../../const';

import { ISearchResults } from './types';
import * as S from './units';

const RESULTS_PER_PAGE = 10;

export const SearchResults: FC<ISearchResults> = ({ search, setBreadcrumbs, visitedPages }) => {
    const [searchVariant, setSearchVariant] = useState<SearchVariants | null>(
        SearchVariants.PRODUCT,
    );

    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * RESULTS_PER_PAGE;
    const endIndex = page * RESULTS_PER_PAGE;

    const [firstEndpointHovered, setFirstEndpointHovered] = useState(true);
    useEffect(() => {
        if (searchVariant === SearchVariants.ENDPOINT) {
            setFirstEndpointHovered(true);
        }
    }, [searchVariant, search]);

    useEffect(() => {
        setPage(1);
    }, [search, searchVariant]);

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

    const [, setSearchParams] = useSearchParams();

    const handleSystemClick = (system: ISearchSystem) => {
        setSearchParams({ name: system.name, cmdb: system.cmdb });
        setBreadcrumbs([
            {
                name: system.name,
                link: `${R.MODELS_PATH}${R.IMPACT_PATH}?name=${system.name}&cmdb=${system.cmdb}`,
            },
        ]);
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
    };

    const dataProductsSliced = data?.products.slice(startIndex, endIndex);
    const productPagesCount = Math.ceil((data?.products.length ?? 0) / RESULTS_PER_PAGE);

    const dataServersCombined = data ? [...data.servers.graph, ...data.servers.cmdb] : undefined;
    const dataServersSliced = dataServersCombined?.slice(startIndex, endIndex);
    const serversPagesCount = Math.ceil(
        ((data?.servers.graph.length ?? 0) + (data?.servers.cmdb.length ?? 0)) / RESULTS_PER_PAGE,
    );

    const dataEndpointsCombined = data
        ? [
              ...data.endpoints.archOperations.map((o) => ({ ...o, from: OperationTypes.ARCH })),
              ...data.endpoints.discoveredOperations.map((o) => ({
                  ...o,
                  from: OperationTypes.DISCOVERED,
              })),
          ]
        : undefined;
    const dataEndpointsSliced = dataEndpointsCombined?.slice(startIndex, endIndex);
    const endpointPagesCount = Math.ceil(
        ((data?.endpoints.archOperations.length ?? 0) +
            (data?.endpoints.discoveredOperations.length ?? 0)) /
            RESULTS_PER_PAGE,
    );

    return (
        <>
            <Text variant="h5">Результаты поиска</Text>
            <Text inactive variant="subtitle3">
                Категории
            </Text>
            <S.ChipsContainer>
                <Chip
                    label={`Приложение${data?.products ? ` (${data.products.length})` : ''}`}
                    active={searchVariant === SearchVariants.PRODUCT}
                    onClick={() => setSearchVariant(SearchVariants.PRODUCT)}
                    disabled={data && productsLength === 0}
                />
                <Chip
                    label={`Сервер${
                        data?.servers
                            ? ` (${data.servers.graph.length + data.servers.cmdb.length})`
                            : ''
                    }`}
                    active={searchVariant === SearchVariants.SERVER}
                    onClick={() => setSearchVariant(SearchVariants.SERVER)}
                    disabled={data && serversLength === 0}
                />
                <Chip
                    label={`Endpoint${
                        data?.endpoints
                            ? ` (${
                                  data.endpoints.archOperations.length +
                                  data.endpoints.discoveredOperations.length
                              })`
                            : ''
                    }`}
                    active={searchVariant === SearchVariants.ENDPOINT}
                    onClick={() => setSearchVariant(SearchVariants.ENDPOINT)}
                    disabled={data && endpointsLength === 0}
                />
            </S.ChipsContainer>
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
            {searchVariant === SearchVariants.PRODUCT && dataProductsSliced && (
                <>
                    <div>
                        {dataProductsSliced.map((system) => (
                            <S.SearchCard
                                key={system.cmdb}
                                onClick={() => handleSystemClick(system)}
                            >
                                <Icon iconName={Icons.Search} size="large" />
                                <S.SearchCardTextContainer>
                                    <Text inactive variant="overline">
                                        КОНТЕКСТНАЯ ДИАГРАММА
                                    </Text>
                                    <Text
                                        link
                                        visited={visitedPages.includes(system.name)}
                                        variant="body2"
                                    >
                                        {getHighlightedText(system.name, search)}
                                    </Text>
                                    <Text inactive variant="body3">
                                        {system.cmdb}
                                    </Text>
                                </S.SearchCardTextContainer>
                            </S.SearchCard>
                        ))}
                    </div>
                    {productPagesCount > 1 && (
                        <S.PaginationContainer>
                            <Pagination
                                collapsed
                                count={productPagesCount}
                                page={page}
                                onChange={setPage}
                            />
                        </S.PaginationContainer>
                    )}
                </>
            )}
            {searchVariant === SearchVariants.SERVER && dataServersSliced && (
                <>
                    {/* {data.servers.graph.length > 0 && (
                        <>
                            <S.SubtitleContainer>
                                <Text inactive variant="subtitle3">
                                    Graph
                                </Text>
                            </S.SubtitleContainer>
                            <div>
                                {data.servers.graph.map((server) => (
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
                                                {getHighlightedText(server.deploymentName, search)}
                                            </Text>
                                            <Text inactive variant="body3">
                                                IP/Host сервера/Имя элемента/Продукт элемента
                                            </Text>
                                        </S.SearchCardTextContainer>
                                    </S.SearchCard>
                                ))}
                            </div>
                        </>
                    )}
                    {data.servers.cmdb.length > 0 && (
                        <>
                            <S.SubtitleContainer>
                                <Text inactive variant="subtitle3">
                                    Cmdb
                                </Text>
                            </S.SubtitleContainer>
                            <div>
                                {data.servers.cmdb.map((server) => (
                                    <S.SearchCard
                                        key={server.name}
                                        onClick={() => handleInfraClick(server)}
                                    >
                                        <Icon iconName={Icons.Search} size="large" />
                                        <S.SearchCardTextContainer>
                                            <Text inactive variant="overline">
                                                КОНТЕКСТНАЯ ДИАГРАММА
                                            </Text>
                                            <Text variant="body2">
                                                {getHighlightedText(server.name, search)}
                                            </Text>
                                            <Text inactive variant="body3">
                                                IP/Host сервера/Имя элемента/Продукт элемента
                                            </Text>
                                        </S.SearchCardTextContainer>
                                    </S.SearchCard>
                                ))}
                            </div>
                        </>
                    )} */}
                    <div>
                        {dataServersSliced.map((item, i) =>
                            'id' in item ? (
                                <>
                                    {page === 1 && i === 0 && (
                                        <S.SubtitleContainer>
                                            <Text inactive variant="subtitle3">
                                                Graph
                                            </Text>
                                        </S.SubtitleContainer>
                                    )}
                                    <S.SearchCard
                                        key={item.id}
                                        onClick={() => handleServerClick(item)}
                                    >
                                        <Icon iconName={Icons.Search} size="large" />
                                        <S.SearchCardTextContainer>
                                            <Text inactive variant="overline">
                                                ДЕПЛОЙМЕНТ ДИАГРАММА
                                            </Text>
                                            <Text
                                                link
                                                variant="body2"
                                                visited={visitedPages.includes(item.deploymentName)}
                                            >
                                                {getHighlightedText(
                                                    item.deploymentName.split('~')[0],
                                                    search,
                                                )}
                                            </Text>
                                            <Text inactive variant="body3">
                                                {item.ip ? `${item.ip}/` : ''}
                                                {item.host ? `${item.host}/` : ''}
                                                {item.cmdb ? `${item.cmdb}` : ''}
                                            </Text>
                                        </S.SearchCardTextContainer>
                                    </S.SearchCard>
                                </>
                            ) : (
                                <>
                                    {dataServersCombined &&
                                        (dataServersCombined[
                                            RESULTS_PER_PAGE * (page - 1) + i - 1
                                        ] === undefined ||
                                            'id' in
                                                dataServersCombined[
                                                    RESULTS_PER_PAGE * (page - 1) + i - 1
                                                ]) && (
                                            <S.SubtitleContainer>
                                                <Text inactive variant="subtitle3">
                                                    Cmdb
                                                </Text>
                                            </S.SubtitleContainer>
                                        )}
                                    <S.SearchCard
                                        key={item.name}
                                        onClick={() => handleInfraClick(item)}
                                    >
                                        <Icon iconName={Icons.Search} size="large" />
                                        <S.SearchCardTextContainer>
                                            <Text inactive variant="overline">
                                                КОНТЕКСТНАЯ ДИАГРАММА ВЛАДЕЛЬЦА{' '}
                                                {item.parentSystems[0]}
                                            </Text>
                                            <Text
                                                link
                                                variant="body2"
                                                visited={visitedPages.includes(item.name)}
                                            >
                                                {getHighlightedText(item.name, search)}
                                            </Text>
                                            <Text inactive variant="body3">
                                                IP/Host сервера/Имя элемента/Продукт элемента
                                            </Text>
                                        </S.SearchCardTextContainer>
                                    </S.SearchCard>
                                </>
                            ),
                        )}
                    </div>
                    {serversPagesCount > 1 && (
                        <S.PaginationContainer>
                            <Pagination
                                collapsed
                                count={serversPagesCount}
                                page={page}
                                onChange={setPage}
                            />
                        </S.PaginationContainer>
                    )}
                </>
            )}
            {searchVariant === SearchVariants.ENDPOINT && (
                <>
                    {(data?.endpoints.archOperations.length ?? 0) +
                        (data?.endpoints.discoveredOperations.length ?? 0) ===
                        50 && (
                        <S.BannerContainer>
                            <Avatar icon={<Icon iconName={Icons.InfoCircled} />} color="blue" />
                            <Text inactive variant="body3">
                                Получено свыше 50 результатов. Выбраны наиболее релевантные.
                                Уточните запрос для узкой выборки
                            </Text>
                        </S.BannerContainer>
                    )}

                    <S.CardsContainer>
                        {dataEndpointsSliced?.map((endpoint, i) => (
                            <>
                                {i === 0 && page === 1 && endpoint.from === OperationTypes.ARCH && (
                                    <S.SubtitleContainer>
                                        <Text inactive variant="subtitle3">
                                            Методы архитектуры
                                        </Text>
                                    </S.SubtitleContainer>
                                )}
                                {endpoint.from === OperationTypes.DISCOVERED &&
                                    ((dataEndpointsCombined ?? [])[
                                        (page - 1) * RESULTS_PER_PAGE + i - 1
                                    ] === undefined ||
                                        (dataEndpointsCombined ?? [])[
                                            (page - 1) * RESULTS_PER_PAGE + i - 1
                                        ].from === OperationTypes.ARCH) && (
                                        <S.SubtitleContainer>
                                            <Text inactive variant="subtitle3">
                                                Методы mapic
                                            </Text>
                                        </S.SubtitleContainer>
                                    )}
                                <S.EndpointContainer
                                    hovered={i === 0 && firstEndpointHovered}
                                    onMouseEnter={() => setFirstEndpointHovered(false)}
                                >
                                    <S.EndpointSearchCard>
                                        <Icon iconName={Icons.Search} size="large" />
                                        <S.SearchCardTextGapContainer>
                                            <div>
                                                <Text inactive variant="overline">
                                                    {endpoint.from === OperationTypes.ARCH
                                                        ? 'Контекстная диаграмма'
                                                        : 'Деплоймент диаграмма'}
                                                </Text>
                                                {endpoint.from === OperationTypes.DISCOVERED &&
                                                    endpoint.connectionOperation && (
                                                        <Text variant="body2">
                                                            {getHighlightedText(
                                                                `Structurizr: ${endpoint.connectionOperation.type.toUpperCase()} ${
                                                                    endpoint.connectionOperation
                                                                        .name
                                                                }`,
                                                                search,
                                                            )}
                                                        </Text>
                                                    )}
                                                <Text variant="body2">
                                                    {getHighlightedText(
                                                        `${
                                                            endpoint.from === OperationTypes.ARCH
                                                                ? 'Structurizr:'
                                                                : 'MAPIC:'
                                                        } ${endpoint.type.toUpperCase()} ${
                                                            endpoint.name
                                                        }`,
                                                        search,
                                                    )}
                                                </Text>
                                            </div>
                                            {endpoint.product && (
                                                <div>
                                                    <Text inactive variant="overline">
                                                        CMDB
                                                    </Text>
                                                    <Text variant="body2">
                                                        {endpoint.product?.alias}
                                                    </Text>
                                                </div>
                                            )}
                                            {endpoint.container && (
                                                <div>
                                                    <Text inactive variant="overline">
                                                        Контейнер
                                                    </Text>
                                                    <Text variant="body2">
                                                        {endpoint.container.code}
                                                    </Text>
                                                </div>
                                            )}
                                            {endpoint.interface && endpoint.interface.code && (
                                                <div>
                                                    <Text inactive variant="overline">
                                                        Интерфейс
                                                    </Text>
                                                    <Text variant="body2">
                                                        {endpoint.interface.code}
                                                    </Text>
                                                </div>
                                            )}
                                        </S.SearchCardTextGapContainer>
                                        <S.ArrowContainer>
                                            <Icon iconName={Icons.ArrowRight} size="large" />
                                        </S.ArrowContainer>
                                    </S.EndpointSearchCard>
                                    <S.EndpointServersSearchCard>
                                        <S.SearchCardTextGapContainer>
                                            {endpoint.deploymentsNodes?.map((node) => (
                                                <div key={node.id}>
                                                    <Text inactive variant="overline">
                                                        СЕРВЕР
                                                    </Text>
                                                    <Text variant="body2">
                                                        <Link
                                                            outer={false}
                                                            visited={visitedPages.includes(
                                                                node.name,
                                                            )}
                                                            url={`${R.MODELS_PATH}${R.IMPACT_PATH}?id=${node.id}&name=${node.name}&cmdb=${endpoint.product?.alias}`}
                                                            title={node.name.replaceAll('~', '/')}
                                                        />
                                                    </Text>
                                                </div>
                                            ))}
                                            {(!endpoint.deploymentsNodes ||
                                                endpoint.deploymentsNodes.length === 0) && (
                                                <Text inactive variant="body2">
                                                    Нет серверов
                                                </Text>
                                            )}
                                        </S.SearchCardTextGapContainer>
                                    </S.EndpointServersSearchCard>
                                </S.EndpointContainer>
                            </>
                        ))}
                    </S.CardsContainer>
                    {endpointPagesCount > 1 && (
                        <S.PaginationContainer>
                            <Pagination
                                collapsed
                                count={endpointPagesCount}
                                page={page}
                                onChange={setPage}
                            />
                        </S.PaginationContainer>
                    )}
                </>
            )}
        </>
    );
};
