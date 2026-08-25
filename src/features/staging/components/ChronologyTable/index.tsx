import React, { FC, Fragment } from 'react';
import {
    getPipelineRunDurationMs,
    pipelineStatusToIconMap,
    pipelineStatusToNameMap,
    pipelineStatusToSemanticMap,
} from 'features/staging';

import { IconBadge, Text } from 'components/core';
import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IChronologyTable } from './types';
import * as S from './units';

export const ChronologyTable: FC<IChronologyTable> = ({ pipelineDetails }) => {
    return (
        <S.Container>
            <Text variant="h5">Хронология выполнения</Text>

            <S.StepsRow>
                {pipelineDetails.stages.map((stage, i) => (
                    <Fragment key={stage.id}>
                        <S.Step>
                            <S.StepContent>
                                <S.StepHeader>
                                    <IconBadge
                                        semantic={pipelineStatusToSemanticMap[stage.status]}
                                        icon={pipelineStatusToIconMap[stage.status]}
                                    />
                                    <Text variant="body2">{stage.stageName}</Text>
                                    <S.TimeContainer>
                                        <Icon size="small" iconName={Icons.Clock} />
                                        <Text variant="caption">
                                            {getPipelineRunDurationMs(
                                                stage.startedAt,
                                                stage.completedAt,
                                            )}{' '}
                                            ms
                                        </Text>
                                    </S.TimeContainer>
                                </S.StepHeader>

                                <S.SubtitleText>
                                    <Text variant="body3" inactive>
                                        {pipelineStatusToNameMap[stage.status]}
                                    </Text>
                                </S.SubtitleText>
                            </S.StepContent>
                        </S.Step>
                        {i !== pipelineDetails.stages.length - 1 && <S.DividerStyled />}
                    </Fragment>
                ))}
            </S.StepsRow>
        </S.Container>
    );
};
