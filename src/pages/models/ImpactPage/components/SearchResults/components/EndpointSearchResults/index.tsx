import React, { FC, useEffect, useState } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { Avatar, Chip, Icon, Pagination } from 'components/ui';

import { OperationTypes } from 'pages/models/ImpactPage/const';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { getHighlightedText } from 'utils/formatters';

import { RESULTS_PER_PAGE } from '../../const';

import { IEndpointSearchResults } from './types';
import * as S from './units';

export const EndpointSearchResults: FC<IEndpointSearchResults> = ({
    endpoints,
    search,
    visitedPages,
}) => {
    const [operationType, setOperationType] = useState<OperationTypes>(OperationTypes.ARCH);

    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * RESULTS_PER_PAGE;
    const endIndex = page * RESULTS_PER_PAGE;

    useEffect(() => {
        setPage(1);
    }, [operationType]);

    const [firstEndpointHovered, setFirstEndpointHovered] = useState(true);

    useEffect(() => {
        if (endpoints) {
            if (endpoints.archOperations.length > endpoints.discoveredOperations.length) {
                setOperationType(OperationTypes.ARCH);
            } else {
                setOperationType(OperationTypes.DISCOVERED);
            }
        }
    }, [endpoints]);

    const archOperationsSliced = endpoints.archOperations.slice(startIndex, endIndex);
    const discoveredOperationsSliced = endpoints.discoveredOperations.slice(startIndex, endIndex);
    const archOperationsPagesCount = Math.ceil(
        (endpoints.archOperations.length ?? 0) / RESULTS_PER_PAGE,
    );
    const discoveredOperationsPagesCount = Math.ceil(
        (endpoints.discoveredOperations.length ?? 0) / RESULTS_PER_PAGE,
    );

    return (
        <>
            {(endpoints.archOperations.length ?? 0) +
                (endpoints.discoveredOperations.length ?? 0) ===
                50 && (
                <S.BannerContainer>
                    <Avatar icon={<Icon iconName={Icons.InfoCircled} />} color="blue" />
                    <Text inactive variant="body3">
                        Получено свыше 50 результатов. Выбраны наиболее релевантные. Уточните запрос
                        для узкой выборки
                    </Text>
                </S.BannerContainer>
            )}

            <S.ChipsContainer>
                <Chip
                    label="Методы архитектуры"
                    active={operationType === OperationTypes.ARCH}
                    onClick={() => setOperationType(OperationTypes.ARCH)}
                    disabled={endpoints.archOperations.length === 0}
                />
                <Chip
                    label="Методы mapic"
                    active={operationType === OperationTypes.DISCOVERED}
                    onClick={() => setOperationType(OperationTypes.DISCOVERED)}
                    disabled={endpoints.discoveredOperations.length === 0}
                />
            </S.ChipsContainer>

            <S.CardsContainer>
                {(operationType === OperationTypes.ARCH
                    ? archOperationsSliced
                    : discoveredOperationsSliced
                )?.map((endpoint, i) => (
                    <>
                        <S.EndpointContainer
                            hovered={i === 0 && firstEndpointHovered}
                            onMouseEnter={() => setFirstEndpointHovered(false)}
                        >
                            <S.EndpointSearchCard>
                                <Icon iconName={Icons.Search} size="large" />
                                <S.SearchCardTextGapContainer>
                                    <div>
                                        <Text inactive variant="overline">
                                            {operationType === OperationTypes.ARCH
                                                ? 'Контекстная диаграмма'
                                                : 'Деплоймент диаграмма'}
                                        </Text>
                                        {operationType === OperationTypes.DISCOVERED &&
                                            endpoint.connectionOperation && (
                                                <Text variant="body2">
                                                    {getHighlightedText(
                                                        `Structurizr: ${endpoint.connectionOperation.type.toUpperCase()} ${
                                                            endpoint.connectionOperation.name
                                                        }`,
                                                        search,
                                                    )}
                                                </Text>
                                            )}
                                        <Text variant="body2">
                                            {getHighlightedText(
                                                `${
                                                    operationType === OperationTypes.ARCH
                                                        ? 'Structurizr:'
                                                        : 'MAPIC:'
                                                } ${endpoint.type.toUpperCase()} ${endpoint.name}`,
                                                search,
                                            )}
                                        </Text>
                                    </div>
                                    {endpoint.product && (
                                        <div>
                                            <Text inactive variant="overline">
                                                CMDB
                                            </Text>
                                            <Text variant="body2">{endpoint.product?.alias}</Text>
                                        </div>
                                    )}
                                    {endpoint.container && (
                                        <div>
                                            <Text inactive variant="overline">
                                                Контейнер
                                            </Text>
                                            <Text variant="body2">{endpoint.container.code}</Text>
                                        </div>
                                    )}
                                    {endpoint.interface && endpoint.interface.code && (
                                        <div>
                                            <Text inactive variant="overline">
                                                Интерфейс
                                            </Text>
                                            <Text variant="body2">{endpoint.interface.code}</Text>
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
                                                    visited={visitedPages.includes(node.name)}
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
            {(operationType === OperationTypes.ARCH
                ? archOperationsPagesCount
                : discoveredOperationsPagesCount) > 1 && (
                <S.PaginationContainer>
                    <Pagination
                        collapsed
                        count={
                            operationType === OperationTypes.ARCH
                                ? archOperationsPagesCount
                                : discoveredOperationsPagesCount
                        }
                        page={page}
                        onChange={setPage}
                    />
                </S.PaginationContainer>
            )}
        </>
    );
};
