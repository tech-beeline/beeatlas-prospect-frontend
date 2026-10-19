import React, { FC, useId, useState } from 'react';

import { Text } from 'components/core';
import { ClampedText } from 'components/interaction';
import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { ICallCard } from './types';
import * as S from './units';

export const CallCard: FC<ICallCard> = ({ title, fields, actions, onExpandedChange }) => {
    const [expanded, setExpanded] = useState(false);
    const tooltipId = useId();

    return (
        <S.Card>
            <S.Header
                type="button"
                expanded={expanded}
                aria-expanded={expanded}
                onClick={() => {
                    setExpanded(!expanded);
                    onExpandedChange?.(!expanded);
                }}
            >
                <S.Title>
                    <ClampedText text={title} lines={2} tooltipId={tooltipId} noArrow place="top" />
                </S.Title>
                <Icon iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown} />
            </S.Header>
            {expanded && (
                <S.Content>
                    <S.Fields>
                        {fields.map((field) => (
                            <S.Field key={field.label}>
                                <Text variant="overline" inactive>
                                    {field.label}
                                </Text>
                                <S.Value>{field.value}</S.Value>
                            </S.Field>
                        ))}
                    </S.Fields>
                    {actions && <S.Actions>{actions}</S.Actions>}
                </S.Content>
            )}
        </S.Card>
    );
};
