import React from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

import {
    type StepIconState,
    ICON_STATE_MAP,
    ORDER_STATE_MAP,
    STEP_ICON_COLOR_MAP,
    STEP_ICON_MAP,
} from './const';
import type { StepperStepProps } from './types';
import * as S from './units';

export const StepperStep = ({
    id,
    signature,
    label,
    state = 'non-visited',
    activated = false,
    order,
    onClick,
    direction,
}: StepperStepProps) => {
    const isClickable = state !== 'disabled' && !!onClick;

    const handleClick = () => {
        onClick?.(id);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <S.Step
            $state={state}
            $clickable={isClickable}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={isClickable ? 'button' : 'presentation'}
            tabIndex={isClickable ? 0 : -1}
        >
            <S.StepContent $direction={direction}>
                {direction === 'vertical' && (
                    <S.StepBorderVertical $activated={activated} aria-hidden />
                )}
                {ORDER_STATE_MAP[state as keyof typeof ORDER_STATE_MAP] && (
                    <S.StepOrder $state={state}>
                        <Typography variant="body2" className="dsb_step-order-number">
                            {order}
                        </Typography>
                    </S.StepOrder>
                )}
                {ICON_STATE_MAP[state as StepIconState] && (
                    <S.StepIcon $state={state}>
                        <Icon
                            size="large"
                            iconName={STEP_ICON_MAP[state as StepIconState]}
                            color={STEP_ICON_COLOR_MAP[state as StepIconState]}
                        />
                    </S.StepIcon>
                )}
                <S.StepBody>
                    {signature && (
                        <S.StepBodyCaption variant="caption" $state={state}>
                            {signature}
                        </S.StepBodyCaption>
                    )}
                    <S.StepBodyMainTypography variant="body2" $state={state}>
                        {label}
                    </S.StepBodyMainTypography>
                </S.StepBody>
            </S.StepContent>
            {direction === 'horizontal' && (
                <S.StepBorderHorizontal $activated={activated} aria-hidden />
            )}
        </S.Step>
    );
};
