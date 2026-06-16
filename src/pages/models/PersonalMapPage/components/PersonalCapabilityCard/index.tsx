import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    CapabilityCardCriteriaComment,
    generateMapColorGradient,
    MapVariant,
    selectColorByCriteria,
} from 'features/maps';
import { useThemeStore } from 'features/theme';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';
import { Icon } from 'components/ui';

import { IMapCapability, IMapCriteria, PersonalMapTypes } from 'api/maps/types';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IPersonalCapabilityCard } from './types';
import * as S from './units';

const BusinessCard: FC<{
    capability: IMapCapability;
    mapVariant: MapVariant | IMapCriteria;
}> = ({ capability, mapVariant }) => {
    const themeIsDark = useThemeStore((store) => store.themeIsDark);

    const [, setParams] = useSearchParams();

    const criteria =
        mapVariant !== MapVariant.DEFAULT
            ? capability.criteria.find((criteria) => criteria.criteria_id === mapVariant.id)
            : undefined;

    return (
        <S.Card
            key={capability.id}
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
                        id: String(capability.id),
                    }),
                );
            }}
        >
            <Text inactive variant="overline">
                БИЗНЕС-ВОЗМОЖНОСТЬ
            </Text>
            <Text variant="body2">{capability.name}</Text>
            {mapVariant !== MapVariant.DEFAULT && (
                <S.CriteriaContainer>
                    <Text variant="body3">{mapVariant.description}</Text>
                    <Text variant="subtitle3">{criteria?.value ?? 0}</Text>
                </S.CriteriaContainer>
            )}
            <CapabilityCardCriteriaComment
                id={`capability-${capability.id}`}
                comment={criteria?.comment}
            />
        </S.Card>
    );
};

const TechCard: FC<{
    capability: IMapCapability;
    mapVariant: MapVariant | IMapCriteria;
}> = ({ capability, mapVariant }) => {
    const themeIsDark = useThemeStore((store) => store.themeIsDark);

    const criteria =
        mapVariant !== MapVariant.DEFAULT
            ? capability.criteria.find((criteria) => criteria.criteria_id === mapVariant.id)
            : undefined;

    return (
        <S.TechCard
            key={capability.id}
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
        >
            <S.Content>
                <Text inactive variant="overline">
                    ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ
                </Text>
                <Text variant="body2">{capability.name}</Text>
                {mapVariant !== MapVariant.DEFAULT && (
                    <S.CriteriaContainer>
                        <Text variant="body3">{mapVariant.description}</Text>
                        <Text variant="subtitle3">{criteria?.value ?? 0}</Text>
                    </S.CriteriaContainer>
                )}
                <CapabilityCardCriteriaComment
                    id={`capability-${capability.id}`}
                    comment={criteria?.comment}
                />
            </S.Content>
            <Icon
                data-tooltip-id={`TECH-${capability.id}`}
                iconName={Icons.InfoCircled}
                size="large"
            />
            <TooltipContainer
                largePadding
                largeWidth
                displayFlex
                clickable
                id={`TECH-${capability.id}`}
                offset={5}
                // @ts-ignore
                place="bottom-start"
                noArrow
            >
                <Text variant="h5">Описание возможности</Text>
                <S.DescriptionText variant="body3">
                    {capability.description || 'Описания нет'}
                </S.DescriptionText>
                <Text variant="body3">
                    Посмотреть детальную информацию можно{'\n'}
                    <Link
                        light
                        title="в древе ФДМ"
                        url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${capability.id}&type=TECH`}
                    />
                </Text>
            </TooltipContainer>
        </S.TechCard>
    );
};

export const PersonalCapabilityCard: FC<IPersonalCapabilityCard> = ({
    item,
    mapVariant,
    mapType,
}) => {
    return (
        <S.GroupCard hasSubgroups={item.childrenGroup && item.childrenGroup.length !== 0}>
            <S.GroupCardTitle>{item.nameGroup}</S.GroupCardTitle>
            {item.capability.map((capability) =>
                mapType.name === PersonalMapTypes.TECH_CAPABILITY ? (
                    <TechCard key={capability.id} capability={capability} mapVariant={mapVariant} />
                ) : (
                    <BusinessCard
                        key={capability.id}
                        capability={capability}
                        mapVariant={mapVariant}
                    />
                ),
            )}
            {item.childrenGroup?.map((subgroup) => (
                <S.SubgroupCard key={subgroup.groupId}>
                    <S.GroupCardTitle>{subgroup.nameGroup}</S.GroupCardTitle>
                    {subgroup.capability.map((capability) =>
                        mapType.name === PersonalMapTypes.TECH_CAPABILITY ? (
                            <TechCard
                                key={capability.id}
                                capability={capability}
                                mapVariant={mapVariant}
                            />
                        ) : (
                            <BusinessCard
                                key={capability.id}
                                capability={capability}
                                mapVariant={mapVariant}
                            />
                        ),
                    )}
                    {subgroup.capability.length === 0 && (
                        <S.Card>
                            <Text variant="body2">Возможностей нет</Text>
                        </S.Card>
                    )}
                </S.SubgroupCard>
            ))}
            {item.capability.length === 0 &&
                (!item.childrenGroup || item.childrenGroup.length === 0) && (
                    <S.Card>
                        <Text variant="body2">Возможностей нет</Text>
                    </S.Card>
                )}
        </S.GroupCard>
    );
};
