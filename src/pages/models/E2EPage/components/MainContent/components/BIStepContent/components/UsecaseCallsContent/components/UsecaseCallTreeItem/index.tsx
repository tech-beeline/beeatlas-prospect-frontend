import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Chip, Icon, IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { callStatusIconMap } from './const';
import { IUsecaseCallTreeItem } from './types';
import * as S from './units';

export const UsecaseCallTreeItem: FC<IUsecaseCallTreeItem> = ({
    call,
    level,
    selectedId,
    onSelect,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const status = callStatusIconMap[call.item.status];

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
                <Icon iconName={status.iconName} color={status.color} size="small" />
                <S.Call>
                    <Text variant="body3">{formatNullableString(call.item.call)}</Text>
                </S.Call>
                {call.item.callee.mnemonic && (
                    <S.Product>
                        <Chip label={call.item.callee.mnemonic} />
                    </S.Product>
                )}
            </S.Row>
            {isExpanded &&
                call.children.map((child) => (
                    <UsecaseCallTreeItem
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
