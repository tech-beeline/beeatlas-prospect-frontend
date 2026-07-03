import React from 'react';

import type { CollapsableTimelineProps } from './types';
import { VerticalContent } from './VerticalContent';

export const CollapsableVerticalTimeline = ({ steps }: CollapsableTimelineProps) => {
    if (!steps.length) {
        return null;
    }

    return (
        <>
            {steps.map((step) => (
                <VerticalContent key={step.id} {...step} type="active" position="middle" />
            ))}
        </>
    );
};
