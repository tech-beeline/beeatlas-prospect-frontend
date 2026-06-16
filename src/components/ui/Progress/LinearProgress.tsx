import React, { useMemo } from 'react';

import type { LinearProgressProps } from './types';
import * as S from './units';
import { classNames, limitProgressValue } from './utils';

export const LinearProgress = ({
    value = 0,
    type = 'solo',
    cycled = false,
    className,
    style,
    ...props
}: LinearProgressProps) => {
    const limitedValue = useMemo(() => limitProgressValue(value), [value]);
    const progressBarWidth = useMemo(() => `${limitedValue}%`, [limitedValue]);

    return (
        <S.LinearProgressRoot
            data-testid="LinearProgress"
            {...props}
            style={style}
            className={classNames(
                'dsb_progress',
                'dsb_progress__linear',
                `dsb_progress__linear-${type}`,
                className,
            )}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemax={100}
            aria-valuemin={0}
        >
            <S.LinearProgressBar
                style={{ width: progressBarWidth }}
                className={classNames(
                    'dsb_progress-bar',
                    cycled && 'dsb_progress-bar__cycled',
                    `dsb_progress-bar__${type}`,
                )}
            />
        </S.LinearProgressRoot>
    );
};

LinearProgress.displayName = 'LinearProgress';
