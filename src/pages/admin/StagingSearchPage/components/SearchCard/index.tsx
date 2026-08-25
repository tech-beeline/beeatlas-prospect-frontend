import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
    artifactStatusToIconMap,
    artifactStatusToNameMap,
    artifactStatusToSemanticMap,
} from 'features/staging';

import { Text } from 'components/core';
import { Badge } from 'components/ui';

import * as R from 'router/const';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import { ISearchCard } from './types';
import * as S from './units';

export const SearchCard: FC<ISearchCard> = ({ searchResult, artifactTypes }) => {
    const navigate = useNavigate();

    const artifactTypeName =
        artifactTypes.find((type) => type.id === searchResult.artifactTypeId)?.name ??
        String(searchResult.artifactTypeId);

    const handleNameClick = () => {
        navigate(
            `${R.ADMIN_PATH}${R.STAGING_SEARCH_PATH}${R.ARTIFACT_PATH}?uid=${searchResult.extUid}&type=${artifactTypeName}`,
        );
    };

    return (
        <S.Container>
            <S.Header>
                <Text link pointer variant="h6" onClick={handleNameClick}>
                    {searchResult.name}
                </Text>
                <Badge
                    type="secondary"
                    semantic={artifactStatusToSemanticMap[searchResult.status]}
                    icon={artifactStatusToIconMap[searchResult.status]}
                >
                    {artifactStatusToNameMap[searchResult.status] ?? searchResult.status}
                </Badge>
            </S.Header>
            <S.Body>
                <div>
                    <Text inactive variant="body3">
                        UID артефакта
                    </Text>
                    <Text variant="body2">{searchResult.extUid}</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Тип артефакта
                    </Text>
                    <Text variant="body2">{artifactTypeName}</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Источник
                    </Text>
                    <Text variant="body2">{formatNullableString(searchResult.sourceName)}</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Дата выгрузки
                    </Text>
                    <Text variant="body2">
                        {dayjs(formatDateToUTC(searchResult.updatedAt))
                            .local()
                            .format('DD.MM.YYYY, HH:mm')}
                    </Text>
                </div>
            </S.Body>
        </S.Container>
    );
};
