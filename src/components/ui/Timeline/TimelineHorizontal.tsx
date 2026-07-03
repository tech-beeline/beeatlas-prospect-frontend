import React, { useMemo } from 'react';

import { Typography } from '../Typography';

import { TimelineAtom } from './TimelineAtom';
import type { TimelineHorizontalProps } from './types';
import * as S from './units';
import { calcAtomType, calcStepPosition, classNames } from './utils';

export const TimelineHorizontal = ({
    steps,
    activeStepIndex = -1,
    completed,
}: TimelineHorizontalProps) => {
    const stepsLength = steps.length;

    const activeStep = useMemo(
        () => (completed ? steps.at(-1) : steps[activeStepIndex]),
        [activeStepIndex, completed, steps],
    );

    const completedStepsCount = useMemo(() => {
        if (completed) {
            return stepsLength;
        }

        if (activeStepIndex < 0) {
            return 0;
        }

        return activeStepIndex;
    }, [completed, activeStepIndex, stepsLength]);

    return (
        <S.HorizontalRoot
            data-testid="TimelineHorizontal"
            className="dsb_timeline__horizontal"
            role="listitem"
        >
            {activeStep && (
                <S.HorizontalBody className="dsb_timeline-body">
                    <S.HorizontalBodyTitle className="dsb_timeline-body-title">
                        <Typography variant="overline" className="dsb_timeline-body-title-name">
                            Текущий этап
                        </Typography>
                        <S.HorizontalBodyTitleStages className="dsb_timeline-body-title-stages">
                            <Typography
                                variant="subtitle1"
                                className="dsb_timeline-body-stages-number"
                            >
                                {activeStep.title}
                            </Typography>
                        </S.HorizontalBodyTitleStages>
                    </S.HorizontalBodyTitle>
                    {activeStep.action}
                </S.HorizontalBody>
            )}
            <S.HorizontalAtomRow className="dsb_timeline-atom">
                {steps.map((step, index) => {
                    const { id, error = false } = step;
                    const position = calcStepPosition(index, stepsLength - 1);
                    const type = completed ? 'active' : calcAtomType(index, activeStepIndex, error);

                    return (
                        <TimelineAtom
                            key={id}
                            type={type}
                            position={position}
                            direction="horizontal"
                        />
                    );
                })}
            </S.HorizontalAtomRow>
            <S.HorizontalBottom className="dsb_timeline-bottom">
                <Typography
                    variant="body2"
                    className={classNames(
                        'dsb_timeline-bottom-text',
                        activeStep?.error && 'dsb_timeline-bottom-text__error',
                    )}
                >
                    {activeStep?.text}
                </Typography>
                <Typography variant="body2" className="dsb_timeline-bottom-count-page">
                    {`Завершено ${completedStepsCount} из ${stepsLength} этапов`}
                </Typography>
            </S.HorizontalBottom>
        </S.HorizontalRoot>
    );
};
