import React, { FC } from 'react';

import { Text } from 'components/core';

import { ICallCard } from './types';
import * as S from './units';

export const CallCard: FC<ICallCard> = ({ title, fields, actions }) => (
    <S.Card>
        <S.Header>
            <Text variant="subtitle3">{title}</Text>
            {actions}
        </S.Header>
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
    </S.Card>
);
