import React, { useMemo } from 'react';

import { TimelineHorizontal } from './TimelineHorizontal';
import { TimelineVertical } from './TimelineVertical';
import type { TimelineProps } from './types';
import * as S from './units';
import { classNames, useExtraSmallDevice } from './utils';

export const Timeline = ({
    direction = 'vertical',
    steps = [],
    activeStepId,
    onCollapse,
    collapsed = false,
    collapsable = false,
    completed = false,
    className,
    ...props
}: TimelineProps) => {
    const isExtraSmallDevice = useExtraSmallDevice();
    const resolvedDirection = isExtraSmallDevice ? 'vertical' : direction;

    if (isExtraSmallDevice && direction === 'horizontal') {
        console.debug(
            '[DSB-Timeline] Для мобильного компонента Timeline используется только direction="vertical"',
        );
    }

    const activeStepIndex = useMemo(
        () => steps.findIndex((step) => step.id === activeStepId),
        [steps, activeStepId],
    );

    if (!steps.length) {
        return null;
    }

    return (
        <S.TimelineRoot
            role="list"
            data-testid="Timeline"
            className={classNames('dsb_timeline', className)}
            {...props}
        >
            {resolvedDirection === 'vertical' && (
                <TimelineVertical
                    steps={steps}
                    collapsable={collapsable}
                    collapsed={collapsed}
                    onCollapse={onCollapse}
                    completed={completed}
                    activeStepIndex={activeStepIndex}
                />
            )}
            {resolvedDirection === 'horizontal' && (
                <TimelineHorizontal
                    steps={steps}
                    activeStepIndex={activeStepIndex}
                    completed={completed}
                />
            )}
        </S.TimelineRoot>
    );
};

Timeline.displayName = 'Timeline';
