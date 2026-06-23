import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { Chip, Icon, Pagination } from 'components/ui';

import { ISearchDeployment } from 'api/graph/types';
import { IInfraData } from 'api/product/types';
import { ServerTypes } from 'pages/models/ImpactPage/const';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { getHighlightedText } from 'utils/formatters';

import { RESULTS_PER_PAGE } from '../../const';

import { IServerSearchResults } from './types';
import * as S from './units';

export const ServerSearchResults: FC<IServerSearchResults> = ({
    servers,
    search,
    setBreadcrumbs,
    visitedPages,
}) => {
    const [, setSearchParams] = useSearchParams();
    const [serverType, setServerType] = useState<ServerTypes>(ServerTypes.GRAPH);

    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [serverType]);

    const [firstServerHovered, setFirstServerHovered] = useState(true);
    const startIndex = (page - 1) * RESULTS_PER_PAGE;
    const endIndex = page * RESULTS_PER_PAGE;

    const groupedGraphServers = useMemo(() => {
        const groups = new Map<string, ISearchDeployment[]>();

        servers.graph.forEach((server) => {
            const existing = groups.get(server.deploymentName) ?? [];
            groups.set(server.deploymentName, [...existing, server]);
        });

        return Array.from(groups.entries()).map(([deploymentName, items]) => ({
            deploymentName,
            items,
        }));
    }, [servers.graph]);

    const graphServersSliced = groupedGraphServers.slice(startIndex, endIndex);
    const cmdbServersSliced = servers.cmdb.slice(startIndex, endIndex);
    const graphServersPagesCount = Math.ceil((groupedGraphServers.length ?? 0) / RESULTS_PER_PAGE);
    const cmdbServersPagesCount = Math.ceil((servers.cmdb.length ?? 0) / RESULTS_PER_PAGE);

    useEffect(() => {
        if (servers) {
            if (servers.graph.length > servers.cmdb.length) {
                setServerType(ServerTypes.GRAPH);
            } else {
                setServerType(ServerTypes.CMDB);
            }
        }
    }, [servers]);

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

    return (
        <>
            <S.ChipsContainer>
                <Chip
                    label="Graph"
                    active={serverType === ServerTypes.GRAPH}
                    onClick={() => setServerType(ServerTypes.GRAPH)}
                    disabled={servers.graph.length === 0}
                />
                <Chip
                    label="Cmdb"
                    active={serverType === ServerTypes.CMDB}
                    onClick={() => setServerType(ServerTypes.CMDB)}
                    disabled={servers.cmdb.length === 0}
                />
            </S.ChipsContainer>

            {serverType === ServerTypes.GRAPH ? (
                <S.CardsContainer>
                    {graphServersSliced.map(({ deploymentName, items }, i) => {
                        const primaryServer = items[0];

                        return (
                            <S.ServerContainer
                                key={deploymentName}
                                hovered={i === 0 && firstServerHovered}
                                onMouseEnter={() => setFirstServerHovered(false)}
                            >
                                <S.GraphServerSearchCard
                                    onClick={() => handleServerClick(primaryServer)}
                                >
                                    <Icon iconName={Icons.Search} size="large" />
                                    <S.SearchCardTextGapContainer>
                                        <div>
                                            <Text inactive variant="overline">
                                                ДЕПЛОЙМЕНТ ДИАГРАММА
                                            </Text>
                                            <Text
                                                link
                                                variant="body2"
                                                visited={visitedPages.includes(deploymentName)}
                                            >
                                                {getHighlightedText(
                                                    deploymentName.split('~')[0],
                                                    search,
                                                )}
                                            </Text>
                                            {(primaryServer.ip || primaryServer.host) && (
                                                <Text inactive variant="body3">
                                                    {primaryServer.ip
                                                        ? `${primaryServer.ip}${
                                                              primaryServer.host ? '/' : ''
                                                          }`
                                                        : ''}
                                                    {primaryServer.host
                                                        ? `${primaryServer.host}`
                                                        : ''}
                                                </Text>
                                            )}
                                        </div>
                                    </S.SearchCardTextGapContainer>
                                    <S.ArrowContainer>
                                        <Icon iconName={Icons.ArrowRight} size="large" />
                                    </S.ArrowContainer>
                                </S.GraphServerSearchCard>
                                <S.GraphServerParentSearchCard>
                                    <S.SearchCardTextGapContainer>
                                        {items.map((item) => (
                                            <div key={item.cmdb}>
                                                <Text inactive variant="overline">
                                                    Родительский продукт
                                                </Text>
                                                <Text variant="body2">
                                                    <Link
                                                        outer={false}
                                                        visited={visitedPages.includes(item.cmdb)}
                                                        url={`${R.MODELS_PATH}${R.IMPACT_PATH}?name=${item.cmdb}&cmdb=${item.cmdb}`}
                                                        title={item.cmdb}
                                                    />
                                                </Text>
                                                <Text inactive variant="body3">
                                                    {item.environmentName}
                                                </Text>
                                            </div>
                                        ))}
                                    </S.SearchCardTextGapContainer>
                                </S.GraphServerParentSearchCard>
                            </S.ServerContainer>
                        );
                    })}
                </S.CardsContainer>
            ) : (
                <div>
                    {cmdbServersSliced.map((item) => (
                        <S.SearchCard
                            maxWidth
                            key={item.name}
                            onClick={() => handleInfraClick(item)}
                        >
                            <Icon iconName={Icons.Search} size="large" />
                            <S.SearchCardTextContainer>
                                <Text inactive variant="overline">
                                    КОНТЕКСТНАЯ ДИАГРАММА ВЛАДЕЛЬЦА {item.parentSystems[0]}
                                </Text>
                                <Text
                                    link
                                    variant="body2"
                                    visited={visitedPages.includes(item.name)}
                                >
                                    {getHighlightedText(item.name, search)}
                                </Text>
                            </S.SearchCardTextContainer>
                        </S.SearchCard>
                    ))}
                </div>
            )}
            {(serverType === ServerTypes.GRAPH ? graphServersPagesCount : cmdbServersPagesCount) >
                1 && (
                <S.PaginationContainer>
                    <Pagination
                        collapsed
                        count={
                            serverType === ServerTypes.GRAPH
                                ? graphServersPagesCount
                                : cmdbServersPagesCount
                        }
                        page={page}
                        onChange={setPage}
                    />
                </S.PaginationContainer>
            )}
        </>
    );
};
