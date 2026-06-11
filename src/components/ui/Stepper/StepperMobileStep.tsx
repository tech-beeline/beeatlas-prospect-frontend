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
import type { StepperMobileStepProps } from './types';
import * as S from './units';

export const StepperMobileStep = ({
    id,
    state = 'non-visited',
    activated = false,
    order,
    onClick,
}: StepperMobileStepProps) => {
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
        <S.MobileStep
            $state={state}
            $clickable={isClickable}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={isClickable ? 'button' : 'presentation'}
            tabIndex={isClickable ? 0 : -1}
        >
            <S.MobileStepBorder $activated={activated} />
            {ORDER_STATE_MAP[state as keyof typeof ORDER_STATE_MAP] && (
                <S.MobileStepOrder $state={state}>
                    <Typography variant="body2" className="dsb_mobile-step-order-number">
                        {order}
                    </Typography>
                </S.MobileStepOrder>
            )}
            {ICON_STATE_MAP[state as StepIconState] && (
                <S.MobileStepIcon $state={state}>
                    <Icon
                        size="large"
                        iconName={STEP_ICON_MAP[state as StepIconState]}
                        color={STEP_ICON_COLOR_MAP[state as StepIconState]}
                    />
                </S.MobileStepIcon>
            )}
        </S.MobileStep>
    );
};
