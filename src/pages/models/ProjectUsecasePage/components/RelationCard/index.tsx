import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { IRelationCard } from './types';
import * as S from './units';

export const RelationCard: FC<IRelationCard> = ({ label, title, code, url }) => (
    <S.Card>
        <Text inactive variant="overline">
            {label}
        </Text>
        <Link title={title} url={url} />
        <Text inactive variant="body3">
            {code}
        </Text>
    </S.Card>
);
