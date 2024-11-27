import React, { FC, useState } from 'react';
import { Avatar, Icon, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { useDraggable } from '@dnd-kit/core';
import { uniqueId } from 'lodash';

import { Text } from 'components/core';
import { Expand } from 'components/other';

import { CapabilitySearchResultTypeVariant } from 'api/capability/types';
import { PersonalMapTypes } from 'api/maps/types';
import { useGetChildrenCapabilitiesQuery } from 'api/queries/capability';
import { PersonalMapElementType } from 'pages/models/MapAddPage/types';

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

    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `TREE-${capability.id}`,
        disabled:
            (type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY &&
                (capability.parent === null || capability.isDomain)) ||
            (type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY &&
                mapType.name !== PersonalMapTypes.BUSINESS_CAPABILITY) ||
            (type === CapabilitySearchResultTypeVariant.TECH_CAPABILITY &&
                mapType.name !== PersonalMapTypes.TECH_CAPABILITY) ||
            selectedCapabilitiesIds.includes(capability.id),
        data: {
            elementId: uniqueId(),
            elementType: PersonalMapElementType.CAPABILITY,
            ...capability,
            type,
        },
    });

    const { data: childrenData, isLoading: isLoadingChildren } = useGetChildrenCapabilitiesQuery({
        id: capability.id,
        enabled: isOpen,
    });

    return (
        <>
            <S.CapabilityCard ref={setNodeRef} {...attributes} {...listeners}>
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
                        iconName={Icons.Capability}
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
                                key={capability.id}
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
                                key={capability.id}
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
