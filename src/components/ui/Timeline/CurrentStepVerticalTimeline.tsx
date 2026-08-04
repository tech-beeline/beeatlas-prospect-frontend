import React, { useMemo } from 'react';

import type { CurrentStepVerticalTimelineProps } from './types';
import * as S from './units';
import { VerticalContent } from './VerticalContent';

export const CurrentStepVerticalTimeline = ({
    steps,
    completed,
    bottom = false,
    collapsable = false,
    collapsed = false,
}: CurrentStepVerticalTimelineProps) => {
    const [step] = steps;

    const type = useMemo(() => {
        if (completed) {
            return 'active' as const;
        }

        if (step?.error) {
            return 'error' as const;
        }

        return 'current' as const;
    }, [completed, step]);

    if (!step) {
        return null;
    }

    const position = completed || bottom ? 'bottom' : 'middle';

    return (
        <S.CurrentStepRoot
            data-testid="CurrentStepVerticalTimeline"
            className="dsb_timeline-current-step"
        >
            <VerticalContent
                {...step}
                type={type}
                position={position}
                collapsable={collapsable}
                collapsed={collapsed}
            />
        </S.CurrentStepRoot>
    );
};
