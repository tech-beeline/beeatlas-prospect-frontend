import React, { FC } from 'react';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';

import { ICallDetailsPanel } from './types';
import * as S from './units';

export const CallDetailsPanel: FC<ICallDetailsPanel> = ({ call }) => (
    <S.Panel>
        <Text variant="subtitle2">Данные вызова</Text>
        {!call && (
            <NotFoundBlock imageVariant={ImageVariants.EMPTY_BOX} text="Выбери вызов из списка" />
        )}
        {call &&
            call.fields.map((field) => (
                <S.Field key={field.label}>
                    <Text inactive variant="body3">
                        {field.label}
                    </Text>
                    <Text variant="body3">{field.value}</Text>
                </S.Field>
            ))}
    </S.Panel>
);
