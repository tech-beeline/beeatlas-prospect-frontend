import React, { useMemo } from 'react';

import { CollapsableFutureVerticalTimeline } from './CollapsableFutureVerticalTimeline';
import { CollapsableVerticalTimeline } from './CollapsableVerticalTimeline';
import { CurrentStepVerticalTimeline } from './CurrentStepVerticalTimeline';
import { TimelineCollapse } from './TimelineCollapse';
import type { TimelineVerticalProps } from './types';
import * as S from './units';
import { calcAtomType, calcStepPosition } from './utils';
import { VerticalContent } from './VerticalContent';

export const TimelineVertical = ({
    steps = [],
    activeStepIndex,
    onCollapse,
    collapsed = false,
    collapsable = false,
    completed = false,
}: TimelineVerticalProps) => {
    const stepsLength = steps.length;

    const sliceIndex = useMemo(() => {
        if (completed) {
            return stepsLength - 1;
        }

        if (activeStepIndex === -1) {
            return -1;
        }

        if (activeStepIndex !== undefined && activeStepIndex >= 0) {
            return activeStepIndex;
        }

        return stepsLength;
    }, [activeStepIndex, completed, stepsLength]);

    const stepsMap = useMemo(
        () => ({
            collapsed: steps.slice(0, Math.max(0, sliceIndex)),
            current: steps.slice(sliceIndex, Math.min(sliceIndex + 1, stepsLength)),
            inactive: steps.slice(sliceIndex + 1, stepsLength),
        }),
        [sliceIndex, steps, stepsLength],
    );

    if (!stepsLength) {
        return null;
    }

    const takenStepsCount = () => {
        if (completed) {
            return stepsLength;
        }

        if (activeStepIndex !== undefined && activeStepIndex >= 0) {
            return activeStepIndex;
        }

        return 0;
    };

    return (
        <S.VerticalRoot data-testid="TimelineVertical">
            {collapsable && (
                <>
                    <TimelineCollapse
                        collapsed={collapsed}
                        onCollapse={onCollapse}
                        amountStepsCount={stepsLength}
                        takenStepsCount={takenStepsCount()}
                        completed={completed}
                        pastSteps
                    >
                        <CollapsableVerticalTimeline steps={stepsMap.collapsed} />
                    </TimelineCollapse>
                    <CurrentStepVerticalTimeline
                        steps={stepsMap.current}
                        completed={completed}
                        collapsable={collapsable}
                        collapsed={collapsed}
                        bottom={sliceIndex === stepsLength - 1}
                    />
                    <TimelineCollapse collapsed={collapsed} completed={completed}>
                        <CollapsableFutureVerticalTimeline steps={stepsMap.inactive} />
                    </TimelineCollapse>
                </>
            )}
            {!collapsable &&
                steps.map((step, index) => {
                    const { error, id } = step;
                    const position = calcStepPosition(index, stepsLength - 1);
                    const type = completed
                        ? 'active'
                        : calcAtomType(index, activeStepIndex ?? -1, error);

                    return <VerticalContent key={id} {...step} type={type} position={position} />;
                })}
        </S.VerticalRoot>
    );
};
