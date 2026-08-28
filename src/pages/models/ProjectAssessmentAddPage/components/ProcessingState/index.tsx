import React, { FC } from 'react';

import { Text } from 'components/core';
import { Progress } from 'components/ui';

import * as S from './units';

interface IProcessingStateProps {
    title: string;
    description?: string;
    progress?: number;
    metrics?: { label: string; value: string | number }[];
}

export const ProcessingState: FC<IProcessingStateProps> = ({
    title,
    description,
    progress = 20,
    metrics = [],
}) => (
    <S.Wrapper>
        <S.Card role="status" aria-live="polite">
            <S.Header>
                <Progress cycled shape="circle" size={44} value={progress} />
                <div>
                    <Text variant="body2">{title}</Text>
                    {description && (
                        <Text inactive variant="body3">
                            {description}
                        </Text>
                    )}
                </div>
            </S.Header>
            {metrics.length > 0 && (
                <S.Metrics>
                    {metrics.map(({ label, value }) => (
                        <S.Metric key={label}>
                            <Text inactive variant="caption">
                                {label}
                            </Text>
                            <Text variant="body2">{value}</Text>
                        </S.Metric>
                    ))}
                </S.Metrics>
            )}
        </S.Card>
    </S.Wrapper>
);
