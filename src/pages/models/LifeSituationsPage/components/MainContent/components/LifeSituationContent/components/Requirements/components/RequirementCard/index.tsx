import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';

import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { IRequirementCard } from './types';
import * as S from './units';

export const RequirementCard: FC<IRequirementCard> = ({ nfr, activeItem }) => {
    return (
        <S.Card>
            <div>
                <Link
                    outer={false}
                    title={formatNullableString(nfr.name)}
                    url={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?chapterId=${activeItem.id}&nfrId=${nfr.id}`}
                />
                <Text inactive variant="body3">
                    {formatNullableString(nfr.code)}
                </Text>
            </div>
            <Text variant="body2">{formatNullableString(nfr.description)}</Text>
            <div>
                <Text inactive variant="body3">
                    Источник
                </Text>
                <Text variant="body2">{formatNullableString(nfr.source)}</Text>
            </div>
            <div>
                <Text inactive variant="body3">
                    Версия
                </Text>
                <Text variant="body2">{formatNullableString(nfr.version)}</Text>
            </div>
        </S.Card>
    );
};
