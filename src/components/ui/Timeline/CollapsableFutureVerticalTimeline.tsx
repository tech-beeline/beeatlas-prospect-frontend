import React from 'react';

import type { CollapsableTimelineProps } from './types';
import * as S from './units';
import { calcStepPosition } from './utils';
import { VerticalContent } from './VerticalContent';

export const CollapsableFutureVerticalTimeline = ({ steps }: CollapsableTimelineProps) => {
    const stepsLength = steps.length;

    if (!stepsLength) {
        return null;
    }

    return (
        <>
            {steps.map((step, index) => {
                const position = calcStepPosition(index, stepsLength - 1);

                return (
                    <S.FutureStepRoot key={step.id} className="dsb_timeline-future-step">
                        <VerticalContent {...step} type="inactive" position={position} />
                    </S.FutureStepRoot>
                );
            })}
        </>
    );
};
