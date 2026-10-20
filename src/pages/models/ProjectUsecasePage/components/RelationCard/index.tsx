import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { Avatar } from 'components/ui';

import { IRelationCard } from './types';
import * as S from './units';

export const RelationCard: FC<IRelationCard> = ({ type, title, code, url }) => (
    <S.Card>
        <Avatar letter={type} color={type === 'CJ' ? 'magenta' : 'blue'} />
        <div>
            <Text variant="subtitle2">
                <Link title={title} url={url} />
            </Text>
            <Text inactive variant="body3">
                {code}
            </Text>
        </div>
    </S.Card>
);
