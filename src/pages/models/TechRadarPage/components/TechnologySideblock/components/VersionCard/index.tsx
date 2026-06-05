import React, { FC } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Divider } from 'components/ui';

import { formatNullableString } from 'utils/formatters';

import { IVersionCard } from './types';
import * as S from './units';

export const VersionCard: FC<IVersionCard> = ({ version, first }) => {
    return (
        <S.VersionCardContainer>
            {!first && <Divider />}
            <S.Row>
                <div>
                    <Text inactive variant="body3">
                        Начало диапазона
                    </Text>
                    <Text variant="body2">{version.versionStart}</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Конец диапазона
                    </Text>
                    <Text variant="body2">{formatNullableString(version.versionEnd)}</Text>
                </div>
            </S.Row>
            <S.Row>
                <div>
                    <Text inactive variant="body3">
                        Статус версии
                    </Text>
                    <Text variant="body2">{version.ring.name}</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Дата создания
                    </Text>
                    <Text variant="body2">{dayjs(version.createdDate).format('DD.MM.YYYY')}</Text>
                </div>
            </S.Row>
        </S.VersionCardContainer>
    );
};
