import React, { FC, useEffect, useRef, useState } from 'react';

import { Text } from 'components/core';
import { Progress } from 'components/ui';

import * as S from './units';

interface IProcessingStateProps {
    title: string;
    description?: string;
    progress?: number;
    startedAt?: number | null;
    metrics?: { label: string; value: string | number }[];
}

const formatDuration = (milliseconds: number) => {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    return [hours, minutes, seconds]
        .map((value, index) => (index === 0 && hours === 0 ? null : String(value).padStart(2, '0')))
        .filter((value): value is string => value !== null)
        .join(':');
};

export const ProcessingState: FC<IProcessingStateProps> = ({
    title,
    description,
    progress = 20,
    startedAt,
    metrics = [],
}) => {
    const mountedAt = useRef(Date.now());
    const operationStartedAt = startedAt ?? mountedAt.current;
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        setCurrentTime(Date.now());
        const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000);

        return () => window.clearInterval(timer);
    }, [operationStartedAt]);

    const displayedMetrics = [
        ...metrics,
        { label: 'Время выполнения', value: formatDuration(currentTime - operationStartedAt) },
    ];

    return (
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
                <S.Metrics>
                    {displayedMetrics.map(({ label, value }) => (
                        <S.Metric key={label}>
                            <Text inactive variant="caption">
                                {label}
                            </Text>
                            <Text variant="body2">{value}</Text>
                        </S.Metric>
                    ))}
                </S.Metrics>
            </S.Card>
        </S.Wrapper>
    );
};
