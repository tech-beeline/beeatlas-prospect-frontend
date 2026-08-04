import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { Skeleton, TableData, TableRow } from 'components/ui';

import { useGetNfrsByPatternIdQuery } from 'api/queries/product';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { IPatternRow } from './types';
import * as S from './units';

export const PatternRow: FC<IPatternRow> = ({ pattern }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { data, isLoading } = useGetNfrsByPatternIdQuery(pattern.id, isExpanded);

    return (
        <>
            <S.TableRowStyled dense isExpanded={isExpanded}>
                <TableData>
                    <S.TitleContainer>
                        <IconButton
                            iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            onClick={() => setIsExpanded((prev) => !prev)}
                            size="medium"
                        />
                        <S.PatternMeta>
                            <Link
                                title={pattern.name}
                                url={`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}?id=${pattern.id}`}
                            />
                            <Text inactive variant="body3">
                                {formatNullableString(pattern.code)}
                            </Text>
                        </S.PatternMeta>
                    </S.TitleContainer>
                </TableData>
            </S.TableRowStyled>
            {isExpanded && (
                <TableRow dense>
                    <S.TableDataStyled>
                        <S.ExpandedContainer>
                            <Text variant="body3">
                                Нефункциональное требование для реализации паттерна:
                            </Text>
                            {isLoading &&
                                Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton key={index} height={24} />
                                ))}
                            {data &&
                                data.map((nfr) => (
                                    <div key={nfr.id}>
                                        <Link
                                            title={nfr.name}
                                            url={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?nfrId=${nfr.id}`}
                                        />
                                        <Text inactive variant="body3">
                                            {formatNullableString(nfr.code)}
                                        </Text>
                                    </div>
                                ))}
                        </S.ExpandedContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
