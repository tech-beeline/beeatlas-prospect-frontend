import React, { useMemo } from 'react';

import type { CircleProgressProps } from './types';
import * as S from './units';
import { classNames, getCircleRadius, limitProgressValue } from './utils';

export const CircleProgress = ({
    value = 0,
    size = 'standart',
    cycled = false,
    className,
    ...props
}: CircleProgressProps) => {
    const radius = useMemo(() => getCircleRadius(size), [size]);
    const circumference = useMemo(() => radius * 2 * Math.PI, [radius]);
    const limitedValue = useMemo(() => limitProgressValue(value), [value]);
    const completed = useMemo(() => limitedValue === 100, [limitedValue]);
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = useMemo(
        () => circumference - (limitedValue / 100) * circumference,
        [circumference, limitedValue],
    );
    const isMini = size === 'mini';

    return (
        <S.CircleProgressWrapper
            data-testid="CircleProgress"
            {...props}
            className={classNames('dsb_progress__circular-wrapper', className)}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemax={100}
            aria-valuemin={0}
        >
            <S.CircleProgressSvg
                className={classNames(
                    'dsb_progress',
                    isMini ? 'dsb_progress__circular_mini' : 'dsb_progress__circular_standart',
                )}
            >
                <S.CircleProgressTrack className="dsb_progress-circle__track" $isMini={isMini} />
                <S.CircleProgressIndication
                    className={classNames(
                        'dsb_progress-circle__indication',
                        cycled && 'dsb_progress-circle__cycled',
                        completed && 'dsb_progress-circle__indication_completed',
                    )}
                    style={{ strokeDashoffset, strokeDasharray }}
                    $cycled={cycled}
                    $completed={completed}
                    $isMini={isMini}
                />
            </S.CircleProgressSvg>
        </S.CircleProgressWrapper>
    );
};

CircleProgress.displayName = 'CircleProgress';
