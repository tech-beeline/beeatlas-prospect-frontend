import React, { FC, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { uniqueId } from 'lodash';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Avatar, Icon, Skeleton } from 'components/ui';

import { CapabilitySearchResultTypeVariant, IMapItemData } from 'api/capability/types';
import { PersonalMapTypes } from 'api/maps/types';
import { useGetMapDataQuery, useGetTechCapabilityByIdQuery } from 'api/queries/capability';
import { PersonalMapElementType } from 'pages/models/MapAddPage/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ICapabilitySearchCard, ICapabilitySearchCardOverlay } from './types';
import * as S from './units';

export const CapabilitiesSearchCard: FC<ICapabilitySearchCard> = ({
    capability,
    mapType,
    selectedCapabilitiesIds,
}) => {
    const [tooltipOpened, setTooltipOpened] = useState(false);

    const isUsed = selectedCapabilitiesIds.includes(capability.id);

    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `SEARCH-${capability.id}`,
        data: {
            elementId: uniqueId(),
            elementType: PersonalMapElementType.CAPABILITY,
            ...capability,
        },
        disabled:
            (capability.type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY &&
                mapType.name !== PersonalMapTypes.BUSINESS_CAPABILITY) ||
            (capability.type === CapabilitySearchResultTypeVariant.TECH_CAPABILITY &&
                mapType.name !== PersonalMapTypes.TECH_CAPABILITY) ||
            isUsed,
    });

    const { data: treeData, isLoading: isLoadingTreeData } = useGetMapDataQuery(
        capability.id,
        capability.type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY && tooltipOpened,
    );

    const capabilityParent = (treeData as IMapItemData | undefined)?.parent?.find(
        (c) => c.isDomain,
    );

    const { data: techCapabilityData, isLoading: isLoadingTechCapability } =
        useGetTechCapabilityByIdQuery({
            id: capability.id,
            enabled:
                capability.type === CapabilitySearchResultTypeVariant.TECH_CAPABILITY &&
                tooltipOpened,
        });

    return (
        <>
            <S.CapabilityCard isUsed={isUsed} ref={setNodeRef} {...attributes} {...listeners}>
                <S.FlexContainer>
                    <Avatar
                        icon={<Icon iconName={Icons.Capability} />}
                        color={
                            capability.type ===
                            CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY
                                ? 'orange'
                                : 'blue'
                        }
                    />
                    <Text variant="body3">{capability.name}</Text>
                </S.FlexContainer>
                <Icon
                    data-tooltip-id={`${capability.type}-${capability.id}`}
                    iconName={Icons.InfoCircled}
                    size="medium"
                    onMouseEnter={() => setTooltipOpened(true)}
                    onMouseLeave={() => setTooltipOpened(false)}
                />
            </S.CapabilityCard>
            <TooltipContainer
                displayFlex
                largePadding
                isOpen={tooltipOpened}
                id={`${capability.type}-${capability.id}`}
                offset={5}
                place="bottom"
                noArrow
            >
                <div>
                    <div>
                        <Text variant="subtitle3">Код возможности</Text>
                    </div>
                    <div>
                        <Text variant="caption">{capability.code}</Text>
                    </div>
                </div>
                <div>
                    <div>
                        <Text variant="subtitle3">Описание</Text>
                    </div>
                    <S.DescriptionContainer>
                        <Text variant="caption">{capability.description || 'Нет описания'}</Text>
                    </S.DescriptionContainer>
                </div>
                {capability.type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY && (
                    <div>
                        <div>
                            <Text variant="subtitle3">Домен</Text>
                        </div>
                        {isLoadingTreeData && <Skeleton height={16} radius={4} />}
                        {capabilityParent && (
                            <div>
                                <Text variant="caption">{capabilityParent.name}</Text>
                            </div>
                        )}
                    </div>
                )}
                {capability.type === CapabilitySearchResultTypeVariant.TECH_CAPABILITY && (
                    <div>
                        <div>
                            <Text variant="subtitle3">Бизнес-возможность</Text>
                        </div>
                        {isLoadingTechCapability && <Skeleton height={16} radius={4} />}
                        {techCapabilityData && (
                            <div>
                                <Text variant="caption">
                                    {techCapabilityData.parents
                                        .map((parent) => parent.name)
                                        .join(', ') || 'Нет бизнес-возможностей'}
                                </Text>
                            </div>
                        )}
                    </div>
                )}
                {capability.type === CapabilitySearchResultTypeVariant.TECH_CAPABILITY && (
                    <div>
                        <div>
                            <Text variant="subtitle3">TC реализована в приложении</Text>
                        </div>
                        {isLoadingTechCapability && <Skeleton height={16} radius={4} />}
                        {techCapabilityData && (
                            <div>
                                <Text variant="caption">
                                    {techCapabilityData.system.name || 'Нет приложений'}
                                </Text>
                            </div>
                        )}
                    </div>
                )}
            </TooltipContainer>
        </>
    );
};

export const CapabilitiesSearchCardOverlay: FC<ICapabilitySearchCardOverlay> = ({ capability }) => {
    return (
        <S.CapabilityCard dragged>
            <Avatar
                icon={<Icon iconName={Icons.Capability} />}
                color={
                    capability.type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY
                        ? 'orange'
                        : 'blue'
                }
            />
            <Text variant="body3">{capability.name}</Text>
        </S.CapabilityCard>
    );
};
