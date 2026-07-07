import React, { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Avatar, Icon } from 'components/ui';

import { useShowTooltip } from 'hooks';

import { IServiceItem } from './types';
import * as S from './units';

export const ServiceItem: FC<IServiceItem> = ({ item }) => {
    const navigate = useNavigate();
    const descriptionRef = useRef<HTMLDivElement>(null);
    const showDescriptionTooltip = useShowTooltip(descriptionRef);
    const descriptionTooltipId = `service-description-${item.to}`;

    return (
        <S.ServiceItemButton type="button" onClick={() => navigate(item.to)}>
            <Avatar color={item.color} icon={<Icon iconName={item.icon} />} />

            <S.ServiceItemContent>
                <Text variant="subtitle3">{item.title}</Text>

                <S.ServiceItemDescription
                    ref={descriptionRef}
                    data-tooltip-id={showDescriptionTooltip ? descriptionTooltipId : undefined}
                >
                    <Text inactive variant="body3">
                        {item.description}
                    </Text>
                </S.ServiceItemDescription>

                {showDescriptionTooltip && (
                    <TooltipContainer
                        largePadding
                        id={descriptionTooltipId}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {item.description}
                    </TooltipContainer>
                )}
            </S.ServiceItemContent>
        </S.ServiceItemButton>
    );
};
