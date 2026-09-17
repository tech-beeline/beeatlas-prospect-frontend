import React, { FC } from 'react';

import { TooltipContainer } from 'components/interaction';
import { Button } from 'components/ui';

import { IStepFooterProps } from './types';
import * as S from './units';

export const StepFooter: FC<IStepFooterProps> = ({
    onBack,
    onRestart,
    restartText,
    restartLoading = false,
    onNext,
    nextText,
    nextDisabled = false,
    nextLoading = false,
    nextTooltip,
    extraAction,
}) => (
    <S.Footer>
        <S.FooterContent>
            {onBack && (
                <Button size="medium" type="button" onClick={onBack}>
                    Назад
                </Button>
            )}
            {onRestart && restartText && (
                <Button
                    disabled={restartLoading}
                    size="medium"
                    type="button"
                    variant="outlined"
                    onClick={onRestart}
                >
                    {restartText}
                </Button>
            )}
            {extraAction}
            {onNext && nextText && (
                <S.NextAction
                    data-tooltip-id={
                        nextDisabled && nextTooltip ? 'step-footer-next-tooltip' : undefined
                    }
                >
                    <Button
                        disabled={nextDisabled || nextLoading}
                        size="medium"
                        type="button"
                        variant="contained"
                        onClick={onNext}
                    >
                        {nextText}
                    </Button>
                    {nextDisabled && nextTooltip && (
                        <TooltipContainer
                            id="step-footer-next-tooltip"
                            noArrow
                            offset={8}
                            place="top"
                        >
                            {nextTooltip}
                        </TooltipContainer>
                    )}
                </S.NextAction>
            )}
        </S.FooterContent>
    </S.Footer>
);
