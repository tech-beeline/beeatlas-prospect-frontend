import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon, Pagination, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { ISearchDeployment, ISearchSystem } from 'api/graph/types';
import { IInfraData } from 'api/product/types';
import { useGetCompleteArchitectureInfoQuery } from 'api/queries/graph';
import * as R from 'router/const';
import { getHighlightedText } from 'utils/formatters';

import { SearchVariants } from '../../const';

import { ISearchResults } from './types';
import * as S from './units';

const RESULTS_PER_PAGE = 10;

export const SearchResults: FC<ISearchResults> = ({ search, searchVariant, setBreadcrumbs }) => {
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * RESULTS_PER_PAGE;
    const endIndex = page * RESULTS_PER_PAGE;

    useEffect(() => {
        setPage(1);
    }, [search]);

    const { data, isLoading } = useGetCompleteArchitectureInfoQuery(search);

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

    return (
        <>
            <Text variant="h5">Результаты поиска</Text>
            {isLoading && (
                <S.SkeletonContainer>
                    {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} radius={12} height={60} />
                    ))}
                </S.SkeletonContainer>
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
                                    <Text variant="body2">
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
                                            <Text variant="body2">
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
                                            <Text variant="body2">
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
        </>
    );
};
