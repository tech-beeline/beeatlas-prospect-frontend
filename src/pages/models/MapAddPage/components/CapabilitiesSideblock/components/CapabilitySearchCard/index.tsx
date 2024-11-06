import React, { FC } from 'react';
import { Avatar } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { useDraggable } from '@dnd-kit/core';
import { uniqueId } from 'lodash';

import { Text } from 'components/core';

import { CapabilitySearchResultTypeVariant } from 'api/capability/types';
import { PersonalMapElementType } from 'pages/models/MapAddPage/types';

import { ICapabilitySearchCard, ICapabilitySearchCardOverlay } from './types';
import * as S from './units';

export const CapabilitiesSearchCard: FC<ICapabilitySearchCard> = ({
    capability,
    dragged = false,
}) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `SEARCH-${capability.id}`,
        data: {
            elementId: uniqueId(),
            elementType: PersonalMapElementType.CAPABILITY,
            ...capability,
        },
    });

    return (
        <>
            <S.CapabilityCard ref={setNodeRef} dragged={dragged} {...attributes} {...listeners}>
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
        </>
    );
};

export const CapabilitiesSearchCardOverlay: FC<ICapabilitySearchCardOverlay> = ({ capability }) => {
    return (
        <>
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
        </>
    );
};
