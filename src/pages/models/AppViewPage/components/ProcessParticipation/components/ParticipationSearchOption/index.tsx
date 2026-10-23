import React, { FC } from 'react';

import { Text } from 'components/core';

import { IParticipationSearchOptionProps } from './types';
import * as S from './units';

export const ParticipationSearchOption: FC<IParticipationSearchOptionProps> = ({ option }) => (
    <S.Container>
        <Text variant="body2">{option.value}</Text>
        <Text variant="body3" inactive>
            {option.code}
        </Text>
    </S.Container>
);
