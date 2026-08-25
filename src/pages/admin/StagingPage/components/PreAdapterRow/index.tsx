import React, { FC, useRef } from 'react';
import dayjs from 'dayjs';
import {
    getPipelineRunDurationMs,
    pipelineStatusToIconMap,
    pipelineStatusToNameMap,
    pipelineStatusToSemanticMap,
} from 'features/staging';

import { IconBadge } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';
import { Badge, TableData, TableRow } from 'components/ui';

import { PipelineStatuses } from 'api/staging-service/types';
import { useShowTooltip } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import { IPreAdapterRow } from './types';
import * as S from './units';

export const PreAdapterRow: FC<IPreAdapterRow> = ({ run }) => {
    const sourceRef = useRef<HTMLDivElement>(null);

    const showSourceTooltip = useShowTooltip(sourceRef);

    const childPipilinesCount = run.childStats.reduce((acc, v) => acc + v.count, 0);

    const successCount =
        run.childStats.find((v) => v.status === PipelineStatuses.COMPLETED)?.count ?? 0;
    const inProgressCount =
        run.childStats
            .filter(
                (v) => ![PipelineStatuses.COMPLETED, PipelineStatuses.FAILED].includes(v.status),
            )
            .reduce((acc, v) => acc + v.count, 0) ?? 0;
    const errorCount = run.childStats.find((v) => v.status === PipelineStatuses.FAILED)?.count ?? 0;
    const durationMs = getPipelineRunDurationMs(run.startedAt, run.completedAt);

    return (
        <TableRow>
            <TableData>{run.id}</TableData>
            <TableData>{run.artifactType}</TableData>
            <TableData>
                <Badge
                    type="secondary"
                    semantic={pipelineStatusToSemanticMap[run.status]}
                    icon={pipelineStatusToIconMap[run.status]}
                >
                    {pipelineStatusToNameMap[run.status]}
                </Badge>
            </TableData>
            <TableData>
                <S.OverflowContainer ref={sourceRef} data-tooltip-id={`source-${run.id}`}>
                    {run.sourceName}
                </S.OverflowContainer>
                {showSourceTooltip && (
                    <TooltipContainer
                        largePadding
                        id={`source-${run.id}`}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {run.sourceName}
                    </TooltipContainer>
                )}
            </TableData>
            <TableData>
                {dayjs(formatDateToUTC(run.startedAt)).local().format('DD.MM.YYYY, HH:mm')}
            </TableData>
            <TableData>
                {run.completedAt
                    ? dayjs(formatDateToUTC(run.completedAt)).local().format('DD.MM.YYYY, HH:mm')
                    : formatNullableString(null)}
            </TableData>
            <TableData>{durationMs} ms</TableData>
            <TableData>
                <Link
                    outer={false}
                    title={`Посмотреть (${childPipilinesCount})`}
                    url={`${R.ADMIN_PATH}${R.STAGING_PATH}${R.PRE_ADAPTER_PATH}?id=${run.id}`}
                />
            </TableData>
            <S.TableDataMaxWidth>
                <S.ChildPipelineStatusContainer>
                    <S.ChildPipelineStatusItem>
                        <S.SuccessText>{successCount}</S.SuccessText>
                        <IconBadge semantic="success" icon={Icons.Check} />
                    </S.ChildPipelineStatusItem>
                    <S.ChildPipelineStatusItem>
                        <S.ErrorText>{errorCount}</S.ErrorText>
                        <IconBadge semantic="danger" icon={Icons.WarningCircled} />
                    </S.ChildPipelineStatusItem>
                    <S.ChildPipelineStatusItem>
                        <S.InfoText>{inProgressCount}</S.InfoText>
                        <IconBadge semantic="info" icon={Icons.RefreshDouble} />
                    </S.ChildPipelineStatusItem>
                </S.ChildPipelineStatusContainer>
            </S.TableDataMaxWidth>
        </TableRow>
    );
};
