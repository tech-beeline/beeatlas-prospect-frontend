import React, { FC, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { uniqueId } from 'lodash';

import { Text } from 'components/core';
import { Expand } from 'components/other';
import { Avatar, Icon, Skeleton } from 'components/ui';

import { CapabilitySearchResultTypeVariant } from 'api/capability/types';
import { PersonalMapTypes } from 'api/maps/types';
import { useGetChildrenCapabilitiesQuery } from 'api/queries/capability';
import { PersonalMapElementType } from 'pages/models/MapAddPage/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ICapabilityTreeCard } from './types';
import * as S from './units';

export const CapabilitiesTreeCard: FC<ICapabilityTreeCard> = ({
    type,
    capability,
    level,
    selectedCapabilitiesIds,
    mapType,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const isUsed = selectedCapabilitiesIds.includes(capability.id);

    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `TREE-${type}-${capability.id}`,
        disabled:
            (type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY &&
                (capability.parent === null || capability.isDomain)) ||
            (type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY &&
                mapType.name !== PersonalMapTypes.BUSINESS_CAPABILITY) ||
            (type === CapabilitySearchResultTypeVariant.TECH_CAPABILITY &&
                mapType.name !== PersonalMapTypes.TECH_CAPABILITY) ||
            isUsed,
        data: {
            elementId: uniqueId(),
            elementType: PersonalMapElementType.CAPABILITY,
            ...capability,
            type,
        },
    });

    const { data: childrenData, isLoading: isLoadingChildren } = useGetChildrenCapabilitiesQuery({
        id: capability.id,
        type,
        enabled: isOpen,
    });

    return (
        <>
            <S.CapabilityCard isUsed={isUsed} ref={setNodeRef} {...attributes} {...listeners}>
                <S.ArrowContainer>
                    {type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY &&
                        capability.hasChildren && (
                            <S.IconButtonStyled
                                isOpen={isOpen}
                                size="medium"
                                iconName={Icons.NavArrowRight}
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        )}
                </S.ArrowContainer>
                {type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY &&
                (capability.parent === null || capability.isDomain) ? (
                    <Icon
                        iconName={
                            capability.parent === null ? Icons.Folder : Icons.PagesMultipleEmpty
                        }
                    />
                ) : (
                    <Avatar
                        icon={<Icon iconName={Icons.Capability} />}
                        color={
                            type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY
                                ? 'orange'
                                : 'blue'
                        }
                    />
                )}

                <Text variant="body3">{capability.name}</Text>
            </S.CapabilityCard>
            <div style={{ marginLeft: 6 * (level + 1) }}>
                <Expand isOpen={isOpen} isAutoHeight>
                    {isLoadingChildren && <Skeleton height={48} radius={12} />}
                    {childrenData &&
                        childrenData.businessCapabilities.map((capability) => (
                            <CapabilitiesTreeCard
                                key={`${type}-${capability.id}`}
                                mapType={mapType}
                                type={CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY}
                                capability={capability}
                                selectedCapabilitiesIds={selectedCapabilitiesIds}
                                level={level + 1}
                            />
                        ))}
                    {childrenData &&
                        childrenData.techCapabilities.map((capability) => (
                            <CapabilitiesTreeCard
                                key={`${type}-${capability.id}`}
                                mapType={mapType}
                                type={CapabilitySearchResultTypeVariant.TECH_CAPABILITY}
                                capability={capability}
                                selectedCapabilitiesIds={selectedCapabilitiesIds}
                                level={level + 1}
                            />
                        ))}
                </Expand>
            </div>
        </>
    );
};
