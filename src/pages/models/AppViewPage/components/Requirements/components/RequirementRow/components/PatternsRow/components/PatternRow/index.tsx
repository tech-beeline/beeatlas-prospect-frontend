import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { Label, Skeleton, TableData, TableRow } from 'components/ui';

import { useGetNfrsByPatternIdQuery } from 'api/queries/product';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { IPatternRow } from './types';
import * as S from './units';

export const PatternRow: FC<IPatternRow> = ({ pattern, productPatterns }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { data, isLoading } = useGetNfrsByPatternIdQuery(pattern.id, isExpanded);

    const isImplemented = productPatterns.some((p) => p.id === pattern.id);

    return (
        <>
            <TableRow>
                <TableData colSpan={6}>
                    <S.PatternContainer>
                        <IconButton
                            iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            onClick={() => setIsExpanded(!isExpanded)}
                            size="medium"
                        />
                        <Link
                            title={pattern.name}
                            url={`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}?id=${pattern.id}`}
                        />
                    </S.PatternContainer>
                </TableData>
                <TableData colSpan={2}>
                    <Label
                        title={isImplemented ? 'Реализовано' : 'Не реализовано'}
                        variant="outline"
                        type={isImplemented ? 'success' : 'error'}
                    />
                </TableData>
            </TableRow>
            {isExpanded && (
                <TableRow>
                    {(isLoading || (data && data.length !== 0)) && (
                        <S.TableDataStyled colSpan={9}>
                            <S.Container>
                                <S.RequirementTitle>
                                    <Text variant="body3">
                                        Нефункциональное требование для реализации паттерна:
                                    </Text>
                                </S.RequirementTitle>
                                {isLoading &&
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <Skeleton key={index} height={24} />
                                    ))}
                                {data &&
                                    data.map((nfr) => (
                                        <S.RequirementContainer key={nfr.id}>
                                            <Link
                                                title={nfr.name}
                                                url={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?nfrId=${nfr.id}`}
                                            />
                                            <Text inactive variant="body3">
                                                {formatNullableString(nfr.code)}
                                            </Text>
                                        </S.RequirementContainer>
                                    ))}
                            </S.Container>
                        </S.TableDataStyled>
                    )}
                    {data && data.length === 0 && (
                        <S.TableDataEmpty colSpan={9}>
                            <Text inactive variant="body2">
                                Нет связанных требований
                            </Text>
                        </S.TableDataEmpty>
                    )}
                </TableRow>
            )}
        </>
    );
};
