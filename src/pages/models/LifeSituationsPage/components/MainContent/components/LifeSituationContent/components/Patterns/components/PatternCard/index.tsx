import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { Skeleton } from 'components/ui';

import { useGetNfrsByPatternIdQuery } from 'api/queries/product';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { formatNullableString } from 'utils/formatters';

import { IPatternCard } from './types';
import * as S from './units';

export const PatternCard: FC<IPatternCard> = ({ pattern, activeItem }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { data, isLoading } = useGetNfrsByPatternIdQuery(pattern.id, isExpanded);
    return (
        <S.Card>
            <div>
                <Link
                    title={pattern.name}
                    url={`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}?id=${pattern.id}`}
                />
                <Text inactive variant="body3">
                    {formatNullableString(pattern.code)}
                </Text>
            </div>
            <S.RequirementsTitle>
                <Text variant="body2">Нефункциональное требование для реализации паттерна</Text>
                <IconButton
                    size="large"
                    iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                    onClick={() => setIsExpanded(!isExpanded)}
                />
            </S.RequirementsTitle>
            {isExpanded && (
                <>
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} height={24} />
                        ))}
                    {data &&
                        data.map((nfr) => (
                            <div key={nfr.id}>
                                <Link
                                    title={formatNullableString(nfr.name)}
                                    url={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?chapterId=${activeItem.id}&nfrId=${nfr.id}`}
                                />
                                <Text inactive variant="body3">
                                    {formatNullableString(nfr.code)}
                                </Text>
                            </div>
                        ))}
                    {data && data.length === 0 && (
                        <Text inactive variant="body3">
                            {formatNullableString(null)}
                        </Text>
                    )}
                </>
            )}
        </S.Card>
    );
};
