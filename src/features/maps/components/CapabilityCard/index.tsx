import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { Link } from 'components/other';

import * as ROUTER from 'router/const';

import { MapVariant, mapVariantToColorArrayMap, mapVariantToDescriptionMap } from '../../const';

import { ICapabilityCard, ITechCapabilityCard } from './types';
import * as S from './units';

export const CapabilityCard: FC<ICapabilityCard> = ({
    item,
    withinGrid = false,
    topLevel = true,
    mapVariant,
}) => {
    const [, setParams] = useSearchParams();

    const isClickable = item.children.length === 0;

    const criteria = item.criteria.find((criteria) => criteria.criterion_id === 1);

    if (isClickable) {
        return (
            <S.Card
                topLevel={topLevel}
                withinGrid={withinGrid}
                style={
                    mapVariant !== MapVariant.DEFAULT
                        ? {
                              backgroundColor:
                                  mapVariantToColorArrayMap[mapVariant][criteria?.grade ?? 0],
                          }
                        : {}
                }
                onClick={() => {
                    setParams(
                        new URLSearchParams({
                            id: String(item.id),
                        }),
                    );
                }}
            >
                <S.CardTitle>{item.isDomain ? 'ДОМЕН' : 'БИЗНЕС-ВОЗМОЖНОСТЬ'}</S.CardTitle>
                <S.CardText>{item.name}</S.CardText>
                {mapVariant !== MapVariant.DEFAULT && (
                    <S.CriteriaContainer>
                        <Text variant="body3">{mapVariantToDescriptionMap[mapVariant]}</Text>
                        <Text variant="subtitle3">{criteria?.value ?? 0}</Text>
                    </S.CriteriaContainer>
                )}
            </S.Card>
        );
    }

    return (
        <S.GroupCard>
            <S.GroupCardTitle>{item.name}</S.GroupCardTitle>
            {item.children.map((child) =>
                child.children.length !== 0 ? (
                    <S.SubgroupCard>
                        <S.GroupCardTitle>{child.name}</S.GroupCardTitle>
                        {child.children.map((c) => (
                            <CapabilityCard
                                topLevel={false}
                                key={c.id}
                                item={c}
                                mapVariant={mapVariant}
                            />
                        ))}
                    </S.SubgroupCard>
                ) : (
                    <CapabilityCard topLevel={false} item={child} mapVariant={mapVariant} />
                ),
            )}
            {item.children.length === 0 && (
                <S.Card>
                    <S.CardText>Возможностей нет</S.CardText>
                </S.Card>
            )}
        </S.GroupCard>
    );
};

export const TechCapabilityCard: FC<ITechCapabilityCard> = ({ techCapability }) => {
    return (
        <>
            <S.TechCapabilityCard>
                <S.CardText>{techCapability.name}</S.CardText>
                <Icon
                    data-tooltip-id={`TECH-${techCapability.id}`}
                    iconName={Icons.InfoCircled}
                    size="large"
                />
            </S.TechCapabilityCard>
            <S.TooltipContainer
                clickable
                id={`TECH-${techCapability.id}`}
                offset={5}
                place="bottom"
                noArrow
            >
                <Text variant="h5">Описание возможности</Text>
                <Text variant="body3">{techCapability.description || 'Описания нет'}</Text>
                <Text variant="body3">
                    Посмотреть детальную информацию можно{'\n'}
                    <Link
                        light
                        title="в древе ФДМ"
                        url={`${ROUTER.MODELS_PATH}${ROUTER.FDM_PATH}?id=${techCapability.id}&type=TECH`}
                    />
                </Text>
            </S.TooltipContainer>
        </>
    );
};
