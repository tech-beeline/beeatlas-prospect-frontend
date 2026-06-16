import React from 'react';

import { BarChart } from './BarChart';
import { DonutChart } from './DonutChart';
import type { ProgressBarProps } from './types';

export const ProgressBar = ({ type, ...props }: ProgressBarProps) => {
    if (type === 'BarChart') {
        return <BarChart type="BarChart" {...props} />;
    }

    return <DonutChart type="DonutChart" {...props} />;
};

ProgressBar.displayName = 'ProgressBar';
