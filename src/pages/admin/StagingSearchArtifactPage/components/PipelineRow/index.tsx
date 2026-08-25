import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
    pipelineStatusToIconMap,
    pipelineStatusToNameMap,
    pipelineStatusToSemanticMap,
} from 'features/staging';

import { Text } from 'components/core';
import { Badge, IconButton } from 'components/ui';
import { TableBody, TableData, TableHead, TableHeaderData, TableRow } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import { IPipelineRow } from './types';
import * as S from './units';

export const PipelineRow: FC<IPipelineRow> = ({ pipeline }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const hasHits = pipeline.count !== 0;

    return (
        <>
            <TableRow>
                <TableData>
                    <S.CellContent>
                        <S.ButtonContainer>
                            {hasHits && (
                                <IconButton
                                    iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    size="medium"
                                />
                            )}
                        </S.ButtonContainer>
                        <Text
                            link
                            pointer
                            variant="body3"
                            onClick={() =>
                                navigate(
                                    `${R.ADMIN_PATH}${R.STAGING_SEARCH_PATH}${R.ARTIFACT_PATH}${R.PIPELINE_PATH}?id=${pipeline.id}`,
                                    {
                                        state: {
                                            artifactUid: pipeline.artifactUid,
                                            artifactType: pipeline.artifactType,
                                        },
                                    },
                                )
                            }
                        >
                            {pipeline.id}
                        </Text>
                    </S.CellContent>
                </TableData>
                <TableData>
                    {dayjs(formatDateToUTC(pipeline.startedAt)).local().format('DD.MM.YYYY, HH:mm')}
                </TableData>
                <TableData>
                    <Badge
                        type="secondary"
                        semantic={pipelineStatusToSemanticMap[pipeline.status]}
                        icon={pipelineStatusToIconMap[pipeline.status]}
                    >
                        {pipelineStatusToNameMap[pipeline.status]}
                    </Badge>
                </TableData>
                <TableData>
                    <Badge semantic={hasHits ? 'success' : 'danger'}>
                        {hasHits ? 'Найдено' : 'Не найдено'}
                    </Badge>
                </TableData>
                <TableData>{pipeline.count}</TableData>
            </TableRow>
            {isExpanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={5}>
                        <S.TableStyled>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Фрагмент</TableHeaderData>
                                    <TableHeaderData>Начало вхождения</TableHeaderData>
                                    <TableHeaderData>Конец вхождения</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pipeline.hits.map((hit, i) => (
                                    <TableRow key={i}>
                                        <TableData>{formatNullableString(hit.snippet)}</TableData>
                                        <TableData>{hit.startOffset}</TableData>
                                        <TableData>{hit.endOffset}</TableData>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </S.TableStyled>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
