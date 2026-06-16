import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { Skeleton } from 'components/ui';

import { useGetOperationsByTechCapabilityQuery } from 'api/queries/product';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { CapabilityOriginOptions } from '../../const';

import { ITechCapabilityCard } from './types';
import * as S from './units';

export const TechCapabilityCard: FC<ITechCapabilityCard> = ({ tc, cmdb }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { data, isLoading } = useGetOperationsByTechCapabilityQuery(String(tc.id), isExpanded);

    const dataFiltered = data?.filter((operation) => operation.product.alias === cmdb);

    return (
        <S.Container>
            <div>
                <Text variant="subtitle2">
                    <Link
                        title={tc.name}
                        url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${tc.id}&type=TECH`}
                    />
                </Text>
                <Text inactive variant="body3">
                    {tc.code}
                </Text>
            </div>
            {/* <div>
                <Text inactive variant="body3">
                    Домен
                </Text>
                <Text
                    link
                    pointer
                    onClick={() => window.open(`${R.MODELS_PATH}${R.FDM_PATH}`)}
                    variant="body2"
                >
                    Омниканальное управление взаимодействиями; Реализация возможностей Communication
                    Platform
                </Text>
            </div> */}
            {tc.origin === CapabilityOriginOptions.IMPLEMENTED && (
                <S.FlexContainer>
                    <Text variant="subtitle2">Методы</Text>
                    <IconButton
                        size="medium"
                        iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </S.FlexContainer>
            )}
            {isExpanded && (
                <S.ApisContainer>
                    {isLoading && <Skeleton height={22} radius={4} />}
                    {dataFiltered && dataFiltered.length === 0 && (
                        <Text inactive variant="body2">
                            Нет методов
                        </Text>
                    )}
                    {dataFiltered &&
                        dataFiltered.length !== 0 &&
                        dataFiltered.map((operation) => (
                            <Text key={operation.id} variant="body2">
                                <Link
                                    title={`${operation.type} ${operation.name}`}
                                    url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=INTERFACES_AND_METHODS&subtab=Structurizr&type=arch_operation&id=${operation.id}&hideEmpty=false&hideDeleted=false`}
                                />
                            </Text>
                        ))}
                </S.ApisContainer>
            )}
        </S.Container>
    );
};
