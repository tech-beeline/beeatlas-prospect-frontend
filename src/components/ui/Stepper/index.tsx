import React from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { StepperMobileStep } from './StepperMobileStep';
import { StepperStep } from './StepperStep';
import type { StepperProps } from './types';
import * as S from './units';
import { useStepper } from './useStepper';
import { classNames } from './utils';

export const Stepper = ({
    switchLength = 2,
    steps,
    direction = 'vertical',
    mobile = false,
    onStepChange,
    activeStepId,
    className,
    enableAutoScroll = true,
    ...props
}: StepperProps) => {
    const { bodyRef, handleLeftClick, handleRightClick, showLeftButton, showRightButton } =
        useStepper({
            activeStepId,
            direction,
            enableAutoScroll,
            mobile,
            steps,
            switchLength,
        });

    return (
        <S.StepperRoot
            data-testid="Stepper"
            className={classNames(
                'dsb_stepper',
                mobile && 'dsb_stepper__mobile',
                direction === 'vertical' && 'dsb_stepper__vertical',
                className,
            )}
            $mobile={mobile}
            $vertical={direction === 'vertical'}
            {...props}
        >
            <S.StepperBody
                ref={bodyRef}
                className={classNames(
                    'dsb_stepper-body',
                    `dsb_stepper-body__${direction}`,
                    mobile && 'dsb_stepper-body__mobile',
                )}
                $direction={direction}
                $mobile={mobile}
            >
                {!mobile &&
                    steps?.map((step, index) => (
                        <StepperStep
                            key={step.id}
                            {...step}
                            direction={direction}
                            activated={activeStepId === step.id}
                            onClick={onStepChange}
                            order={index + 1}
                        />
                    ))}
                {mobile &&
                    steps?.map((step, index) => (
                        <StepperMobileStep
                            key={step.id}
                            {...step}
                            activated={activeStepId === step.id}
                            onClick={onStepChange}
                            order={index + 1}
                        />
                    ))}
            </S.StepperBody>
            {showLeftButton && (
                <S.ScrollIconButton
                    $position="left"
                    className="dsb_stepper-button dsb_stepper-button__arrow-left"
                    iconName={Icons.ArrowLeft}
                    size="large"
                    variant="overlay"
                    aria-label="Прокрутить влево"
                    onClick={handleLeftClick}
                />
            )}
            {showRightButton && (
                <S.ScrollIconButton
                    $position="right"
                    className="dsb_stepper-button dsb_stepper-button__arrow-right"
                    iconName={Icons.ArrowRight}
                    size="large"
                    variant="overlay"
                    aria-label="Прокрутить вправо"
                    onClick={handleRightClick}
                />
            )}
        </S.StepperRoot>
    );
};

Stepper.displayName = 'Stepper';
