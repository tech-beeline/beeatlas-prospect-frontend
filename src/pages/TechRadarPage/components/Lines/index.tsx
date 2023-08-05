import React from 'react';

import { theme } from 'styles';

// var(--color-background-base)

export const Lines = () => {
    return (
        <>
            <line
                x1="0"
                y1="1"
                x2="0"
                y2="45"
                style={{ stroke: theme.colors.divider, strokeWidth: '0.2' }}
                strokeDasharray="1"
            />
            <line
                x1="0"
                y1="-45"
                x2="0"
                y2="-1"
                style={{ stroke: theme.colors.divider, strokeWidth: '0.2' }}
                strokeDasharray="1"
            />
            <line
                x1="1"
                y1="0"
                x2="45"
                y2="0"
                style={{ stroke: theme.colors.divider, strokeWidth: '0.2' }}
                strokeDasharray="1"
            />
            <line
                x1="-45"
                y1="0"
                x2="-1"
                y2="0"
                style={{ stroke: theme.colors.divider, strokeWidth: '0.2' }}
                strokeDasharray="1"
            />
        </>
    );
};
