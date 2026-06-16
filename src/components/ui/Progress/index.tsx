import React from 'react';

import { AnimatedProgress } from './AnimatedProgress';
import { CircleProgress } from './CircleProgress';
import { DEFAULT_PROGRESS_SIZE } from './const';
import { LinearProgress } from './LinearProgress';
import type { ProgressProps } from './types';

export const Progress = ({
    value = 0,
    shape = 'linear',
    cycled = false,
    strokeWidth = 4,
    size = DEFAULT_PROGRESS_SIZE,
    type = 'container',
    ...props
}: ProgressProps) => {
    if (shape === 'linear') {
        return (
            <LinearProgress
                value={value}
                type={type}
                cycled={cycled}
                strokeWidth={strokeWidth}
                {...props}
            />
        );
    }

    if (shape === 'animated') {
        return <AnimatedProgress {...props} />;
    }

    if (!size) {
        return null;
    }

    return (
        <CircleProgress
            value={value}
            cycled={cycled}
            strokeWidth={strokeWidth}
            size={size}
            {...props}
        />
    );
};

Progress.displayName = 'Progress';
