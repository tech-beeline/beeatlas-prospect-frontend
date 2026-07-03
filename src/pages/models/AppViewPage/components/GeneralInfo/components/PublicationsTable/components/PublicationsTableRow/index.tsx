import React, { FC, useState } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Label, Skeleton, TableData, TableRow, Timeline } from 'components/ui';

import { useGetProcessesById, useGetProcessesStatus } from 'api/queries/camunda';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { getProcessStatus } from './helpers';
import { IPublicationsTableRow } from './types';
import * as S from './units';

export const PublicationsTableRow: FC<IPublicationsTableRow> = ({ process }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { title, type } = getProcessStatus(process.status);

    const { data: processDetails, isLoading: isLoadingProcessDetails } = useGetProcessesById(
        String(process.id),
        isExpanded,
        isExpanded ? 5000 : false,
    );
    const { data: pipelineStatuses, isLoading: isLoadingProcessStatus } = useGetProcessesStatus(
        process.type.id,
        isExpanded,
    );

    const processStatuses = processDetails?.statuses ?? [];
    const statusesByAlias = new Map(pipelineStatuses?.map((status) => [status.alias, status]));
    const currentProcessStatus = [...processStatuses]
        .sort((a, b) => dayjs(a.createdDate).valueOf() - dayjs(b.createdDate).valueOf())
        .at(-1);
    const currentSequence = currentProcessStatus
        ? statusesByAlias.get(currentProcessStatus.alias)?.sequence
        : undefined;
    const timelineStatuses = pipelineStatuses?.filter((status) => !status.isError);

    const steps =
        timelineStatuses?.map((pipelineStatus) => {
            const completedStatus = processStatuses.find(
                (status) => status.alias === pipelineStatus.alias,
            );

            const isCurrentErrorStep =
                currentProcessStatus?.isError && currentSequence === pipelineStatus.sequence;

            const displayStatus = isCurrentErrorStep ? currentProcessStatus : completedStatus;

            return {
                id: pipelineStatus.id.toString(),
                title: (
                    <>
                        <Text variant="subtitle1">
                            {displayStatus?.name ?? pipelineStatus.name}
                        </Text>

                        {displayStatus?.createdDate && (
                            <Text variant="body2" inactive>
                                {dayjs(displayStatus.createdDate)
                                    .local()
                                    .format('DD.MM.YYYY, HH:mm')}
                            </Text>
                        )}
                    </>
                ),
                error: isCurrentErrorStep,
            };
        }) ?? [];

    const activeStepId = timelineStatuses
        ?.find((status) => status.sequence === currentSequence)
        ?.id.toString();
    const isStepCompleted = process.status.isDone;

    const isTimelineLoading =
        isLoadingProcessStatus || isLoadingProcessDetails || !pipelineStatuses || !processDetails;

    return (
        <>
            <TableRow>
                <S.TableDataFullWidth>
                    <S.IconButtonStyled
                        expanded={isExpanded}
                        size="medium"
                        iconName={Icons.NavArrowDown}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                    {`${process.type.name} от ${dayjs(process.status.createdDate)
                        .local()
                        .format('DD.MM.YYYY, HH:mm')}`}
                </S.TableDataFullWidth>
                <TableData>{process.type.name}</TableData>
                <TableData>
                    <Label type={type} variant="contained" title={title} />
                </TableData>
            </TableRow>
            {isExpanded && (
                <S.TrStyled>
                    <S.ExpandedTd colSpan={3}>
                        {isTimelineLoading ? (
                            <S.SkeletonWrapper>
                                <Skeleton height={40} variant="square" width="100%" />
                                <Skeleton height={40} variant="square" width="100%" />
                            </S.SkeletonWrapper>
                        ) : (
                            <Timeline
                                direction="horizontal"
                                steps={steps}
                                activeStepId={activeStepId}
                                completed={isStepCompleted}
                            />
                        )}
                    </S.ExpandedTd>
                </S.TrStyled>
            )}
        </>
    );
};
