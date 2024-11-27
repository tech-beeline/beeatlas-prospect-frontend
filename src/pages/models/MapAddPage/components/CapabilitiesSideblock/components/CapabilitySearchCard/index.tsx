import React, { FC, useState } from 'react';
import { Avatar, Icon, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { useDraggable } from '@dnd-kit/core';
import { uniqueId } from 'lodash';

import { Text } from 'components/core';

import { CapabilitySearchResultTypeVariant, IMapItemData } from 'api/capability/types';
import { PersonalMapTypes } from 'api/maps/types';
import {
    useGetMapDataQuery,
    useGetTechCapabilityByIdQuery,
    useGetTechCapabilityProductsQuery,
} from 'api/queries/capability';
import { PersonalMapElementType } from 'pages/models/MapAddPage/types';

import { ICapabilitySearchCard, ICapabilitySearchCardOverlay } from './types';
import * as S from './units';

export const CapabilitiesSearchCard: FC<ICapabilitySearchCard> = ({
    capability,
    mapType,
    selectedCapabilitiesIds,
    dragged = false,
}) => {
    const [tooltipOpened, setTooltipOpened] = useState(false);

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
            selectedCapabilitiesIds.includes(capability.id),
    });

    const { data: treeData, isLoading: isLoadingTreeData } = useGetMapDataQuery(
        capability.id,
        capability.type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY && tooltipOpened,
    );

    const capabilityParent = (treeData as IMapItemData | undefined)?.parent?.find(
        (c) => c.isDomain,
    );

    const { data: products, isLoading: isLoadingProducts } = useGetTechCapabilityProductsQuery(
        capability.code,
        capability.type === CapabilitySearchResultTypeVariant.TECH_CAPABILITY && tooltipOpened,
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
            <S.CapabilityCard ref={setNodeRef} dragged={dragged} {...attributes} {...listeners}>
                <S.FlexContainer>
                    <Avatar
                        iconName={Icons.Capability}
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
            <S.TooltipContainer
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
                            <Text variant="subtitle3">TC реализована в продукте</Text>
                        </div>
                        {isLoadingProducts && <Skeleton height={16} radius={4} />}
                        {products && (
                            <div>
                                <Text variant="caption">
                                    {products.map((product) => product.name).join(', ') ||
                                        'Нет продуктов'}
                                </Text>
                            </div>
                        )}
                    </div>
                )}
            </S.TooltipContainer>
        </>
    );
};

export const CapabilitiesSearchCardOverlay: FC<ICapabilitySearchCardOverlay> = ({ capability }) => {
    return (
        <S.CapabilityCard dragged>
            <Avatar
                iconName={Icons.Capability}
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
