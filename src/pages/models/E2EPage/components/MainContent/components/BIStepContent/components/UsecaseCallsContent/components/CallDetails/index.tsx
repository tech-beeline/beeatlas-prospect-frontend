import React, { FC } from 'react';

import { Text } from 'components/core';

import { ICallDetails } from './types';
import * as S from './units';
import { getCallDetailsFields } from './utils';

export const CallDetails: FC<ICallDetails> = ({ call }) => (
    <S.Panel>
        <Text variant="subtitle2">Данные вызова</Text>
        {!call && (
            <Text inactive variant="body3">
                Выберите вызов в дереве
            </Text>
        )}
        {call &&
            getCallDetailsFields(call).map((field) => (
                <S.Field key={field.label}>
                    <Text inactive variant="body3">
                        {field.label}
                    </Text>
                    <Text variant="body3">{field.value}</Text>
                </S.Field>
            ))}
    </S.Panel>
);
