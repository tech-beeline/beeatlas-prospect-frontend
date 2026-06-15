import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateMapColorGradient, selectColorByCriteria } from 'features/maps/utils';
import { useThemeStore } from 'features/theme';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';
import { Icon } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { MapVariant } from '../../const';
import { CapabilityCardCriteriaComment } from '../CapabailityCardCriteriaComment';

import { ICapabilityCard, ITechCapabilityCard } from './types';
import * as S from './units';

export const CapabilityCard: FC<ICapabilityCard> = ({
    item,
    withinGrid = false,
    topLevel = true,
    mapVariant,
}) => {
    const themeIsDark = useThemeStore((store) => store.themeIsDark);

    const [, setParams] = useSearchParams();

    const isClickable = item.children.length === 0;

    const criteria =
        mapVariant !== MapVariant.DEFAULT
            ? item.criteria.find((criteria) => criteria.criterion_id === mapVariant.id)
            : undefined;

    if (isClickable) {
        return (
            <S.Card
                topLevel={topLevel}
                withinGrid={withinGrid}
                style={
                    mapVariant !== MapVariant.DEFAULT
                        ? {
                              backgroundColor: selectColorByCriteria(
                                  generateMapColorGradient(
                                      themeIsDark,
                                      mapVariant.revers,
                                      mapVariant.interval ?? 2,
                                      mapVariant.threshold,
                                  ),
                                  mapVariant,
                                  criteria?.grade ?? 0,
                                  criteria?.value ?? 0,
                              ),
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
                        <Text variant="body3">{mapVariant.description}</Text>
                        <Text variant="subtitle3">{criteria?.value ?? 0}</Text>
                    </S.CriteriaContainer>
                )}
                <CapabilityCardCriteriaComment
                    id={`capability-${item.id}`}
                    comment={criteria?.comment}
                />
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

export const TechCapabilityCard: FC<ITechCapabilityCard> = ({ techCapability, mapVariant }) => {
    const themeIsDark = useThemeStore((store) => store.themeIsDark);
    const criteria =
        mapVariant && mapVariant !== MapVariant.DEFAULT
            ? techCapability.criteria?.find((c) => c.criteria_id === mapVariant.id)
            : undefined;

    const grade = criteria?.grade ?? 0;
    const value = criteria?.value ?? 0;

    let backgroundColor: string | undefined;

    if (mapVariant && mapVariant !== MapVariant.DEFAULT) {
        const gradient = generateMapColorGradient(
            themeIsDark,
            mapVariant.revers ?? false,
            mapVariant.interval ?? 2,
            mapVariant.threshold,
        );

        backgroundColor = selectColorByCriteria(gradient, mapVariant, grade, value);
    }

    return (
        <>
            <S.TechCapabilityCard style={{ backgroundColor }}>
                <S.TechCapabilityTitleContainer>
                    <S.CardText>{techCapability.name}</S.CardText>
                    <Icon
                        data-tooltip-id={`TECH-${techCapability.id}`}
                        iconName={Icons.InfoCircled}
                        size="large"
                    />
                </S.TechCapabilityTitleContainer>
                {mapVariant && mapVariant !== MapVariant.DEFAULT && (
                    <S.CriteriaContainer>
                        <Text variant="body3">{(mapVariant as any).description}</Text>
                        <Text variant="subtitle3">{criteria?.value ?? 0}</Text>
                    </S.CriteriaContainer>
                )}
                <CapabilityCardCriteriaComment
                    id={`tech-capability-${techCapability.id}`}
                    comment={criteria?.comment}
                />
            </S.TechCapabilityCard>
            <TooltipContainer
                displayFlex
                largePadding
                largeWidth
                clickable
                id={`TECH-${techCapability.id}`}
                offset={5}
                place="bottom"
                noArrow
            >
                <Text variant="h5">Описание возможности</Text>
                <S.DescriptionText variant="body3">
                    {techCapability.description || 'Описания нет'}
                </S.DescriptionText>
                <Text variant="body3">
                    Посмотреть детальную информацию можно{'\n'}
                    <Link
                        light
                        title="в древе ФДМ"
                        url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${techCapability.id}&type=TECH`}
                    />
                </Text>
            </TooltipContainer>
        </>
    );
};
