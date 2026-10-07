import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Chip, Icon, IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { ICallTreeRow } from './types';
import * as S from './units';

export const CallTreeRow: FC<ICallTreeRow> = ({ call, level, selectedId, onSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const tooltipId = `call-product-${call.id}`;

    return (
        <>
            <S.Row
                level={level}
                selected={selectedId === call.id}
                onClick={() => onSelect(call.id)}
            >
                <S.ExpandButton>
                    {call.children.length > 0 && (
                        <IconButton
                            size="medium"
                            iconName={isExpanded ? Icons.NavArrowDown : Icons.NavArrowRight}
                            onClick={(event) => {
                                event.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                        />
                    )}
                </S.ExpandButton>
                <Icon iconName={call.status.iconName} color={call.status.color} size="small" />
                <S.Call>
                    <Text variant="body3">{call.call}</Text>
                </S.Call>
                {call.product && (
                    <S.Product data-tooltip-id={tooltipId}>
                        <Chip label={call.product} />
                    </S.Product>
                )}
                {call.product && call.productTitle && (
                    <TooltipContainer id={tooltipId} place="top" offset={8} noArrow>
                        {call.productTitle}
                    </TooltipContainer>
                )}
            </S.Row>
            {isExpanded &&
                call.children.map((child) => (
                    <CallTreeRow
                        key={child.id}
                        call={child}
                        level={level + 1}
                        selectedId={selectedId}
                        onSelect={onSelect}
                    />
                ))}
        </>
    );
};
