import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { MapVariant, mapVariantToColorArrayMap, mapVariantToDescriptionMap } from 'features/maps';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { IMapCapability, PersonalMapTypes } from 'api/maps/types';
import * as R from 'router/const';

import { IPersonalCapabilityCard } from './types';
import * as S from './units';

const BusinessCard: FC<{
    capability: IMapCapability;
    mapVariant: MapVariant;
}> = ({ capability, mapVariant }) => {
    const [, setParams] = useSearchParams();
    return (
        <S.Card
            key={capability.id}
            style={
                mapVariant !== MapVariant.DEFAULT
                    ? {
                          backgroundColor:
                              mapVariantToColorArrayMap[mapVariant][
                                  capability.criteria?.grade ?? 0
                              ],
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
                    <Text variant="body3">{mapVariantToDescriptionMap[mapVariant]}</Text>
                    <Text variant="subtitle3">{capability.criteria?.grade ?? 0}</Text>
                </S.CriteriaContainer>
            )}
        </S.Card>
    );
};

const TechCard: FC<{
    capability: IMapCapability;
    mapVariant: MapVariant;
}> = ({ capability, mapVariant }) => {
    return (
        <S.TechCard
            key={capability.id}
            style={
                mapVariant !== MapVariant.DEFAULT
                    ? {
                          backgroundColor:
                              mapVariantToColorArrayMap[mapVariant][
                                  capability.criteria?.grade ?? 0
                              ],
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
                        <Text variant="body3">{mapVariantToDescriptionMap[mapVariant]}</Text>
                        <Text variant="subtitle3">{capability.criteria?.grade ?? 0}</Text>
                    </S.CriteriaContainer>
                )}
            </S.Content>
            <Icon
                data-tooltip-id={`TECH-${capability.id}`}
                iconName={Icons.InfoCircled}
                size="large"
            />
            <S.TooltipContainer
                clickable
                id={`TECH-${capability.id}`}
                offset={5}
                // @ts-ignore
                place="bottom-start"
                noArrow
            >
                <Text variant="h5">Описание возможности</Text>
                <Text variant="body3">{capability.description || 'Описания нет'}</Text>
                <Text variant="body3">
                    Посмотреть детальную информацию можно{'\n'}
                    <Link
                        light
                        title="в древе ФДМ"
                        url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${capability.id}&type=TECH`}
                    />
                </Text>
            </S.TooltipContainer>
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
