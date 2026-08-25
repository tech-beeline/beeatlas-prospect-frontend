import React, { FC, useRef } from 'react';
import dayjs from 'dayjs';
import {
    getPipelineRunDurationMs,
    pipelineStatusToIconMap,
    pipelineStatusToNameMap,
    pipelineStatusToSemanticMap,
} from 'features/staging';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';
import { Badge, TableData, TableRow } from 'components/ui';

import { useShowTooltip } from 'hooks';
import * as R from 'router/const';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import { IChildPipelineRow } from './types';
import * as S from './units';

export const ChildPipelineRow: FC<IChildPipelineRow> = ({
    pipeline,
    preAdapterRunId,
    setSelectedPipeline,
}) => {
    const artifactUidRef = useRef<HTMLDivElement>(null);
    const artifactNameRef = useRef<HTMLDivElement>(null);
    const sourceRef = useRef<HTMLDivElement>(null);

    const showArtifactUidTooltip = useShowTooltip(artifactUidRef);
    const showArtifactNameTooltip = useShowTooltip(artifactNameRef);
    const showSourceTooltip = useShowTooltip(sourceRef);

    const durationMs = getPipelineRunDurationMs(pipeline.startedAt, pipeline.completedAt);

    return (
        <TableRow>
            <TableData>
                <Link
                    outer={false}
                    title={String(pipeline.id)}
                    url={`${R.ADMIN_PATH}${R.STAGING_PATH}${R.PRE_ADAPTER_PATH}${
                        R.PIPELINE_PATH
                    }?id=${pipeline.id}&preAdapterRunId=${String(preAdapterRunId)}`}
                />
            </TableData>
            <TableData>
                <S.OverflowContainer
                    ref={artifactUidRef}
                    data-tooltip-id={`artifact-uid-${pipeline.id}`}
                >
                    {pipeline.artifactUid}
                </S.OverflowContainer>
                {showArtifactUidTooltip && (
                    <TooltipContainer
                        largePadding
                        id={`artifact-uid-${pipeline.id}`}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {pipeline.artifactUid}
                    </TooltipContainer>
                )}
            </TableData>
            <TableData>
                <S.OverflowContainer
                    ref={artifactNameRef}
                    data-tooltip-id={`artifact-name-${pipeline.id}`}
                >
                    {pipeline.artifactName}
                </S.OverflowContainer>
                {showArtifactNameTooltip && (
                    <TooltipContainer
                        largePadding
                        id={`artifact-name-${pipeline.id}`}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {pipeline.artifactName}
                    </TooltipContainer>
                )}
            </TableData>
            <TableData>{pipeline.artifactType}</TableData>
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
                <S.OverflowContainer ref={sourceRef} data-tooltip-id={`source-${pipeline.id}`}>
                    {pipeline.sourceName}
                </S.OverflowContainer>
                {showSourceTooltip && (
                    <TooltipContainer
                        largePadding
                        id={`source-${pipeline.id}`}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {pipeline.sourceName}
                    </TooltipContainer>
                )}
            </TableData>
            <TableData>
                {dayjs(formatDateToUTC(pipeline.startedAt)).local().format('DD.MM.YYYY, HH:mm')}
            </TableData>
            <TableData>
                {pipeline.completedAt
                    ? dayjs(formatDateToUTC(pipeline.completedAt))
                          .local()
                          .format('DD.MM.YYYY, HH:mm')
                    : formatNullableString(null)}
            </TableData>
            <TableData>{durationMs} ms</TableData>
            <TableData>
                {pipeline.rawDataRefId ? (
                    <Text link variant="body3" onClick={() => setSelectedPipeline(pipeline)}>
                        Посмотреть
                    </Text>
                ) : (
                    formatNullableString(null)
                )}
            </TableData>
        </TableRow>
    );
};
