import React, { FC, useState } from 'react';
import { Avatar, Icon } from '@beeline/design-system-react';
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
    const [tooltipOpened, setTooltipOpened] = useState(false);

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
                    <div>
                        <Text variant="caption">{capability.description || 'Нет описания'}</Text>
                    </div>
                </div>
                <div>
                    <div>
                        <Text variant="subtitle3">Домен</Text>
                    </div>
                    <div>
                        <Text variant="caption">Домен</Text>
                    </div>
                </div>
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
