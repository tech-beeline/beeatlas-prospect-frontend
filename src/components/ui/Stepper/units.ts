import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { IconButton } from '../IconButton';
import { Typography } from '../Typography';

import type { StepperDirectionType, StepStateType } from './types';

export const StepperRoot = styled.div<{ $mobile?: boolean; $vertical?: boolean }>`
    max-width: 100%;
    position: relative;
    padding: 0 36px;
    overflow-x: hidden;

    ${({ $mobile }) =>
        $mobile &&
        css`
            padding: 0;
            overflow-x: unset;
        `}

    ${({ $vertical }) =>
        $vertical &&
        css`
            width: fit-content;
            padding: 0;
        `}
`;

export const StepperBody = styled.div<{
    $direction: StepperDirectionType;
    $mobile?: boolean;
}>`
    width: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: ${({ $direction }) => ($direction === 'vertical' ? 'column' : 'row')};

    ${({ $mobile }) =>
        $mobile &&
        css`
            flex-direction: row;
            overflow-x: auto;
        `}

    ${({ $direction }) =>
        $direction === 'vertical' &&
        css`
            width: fit-content;
        `}
`;

export const ScrollIconButton = styled(IconButton)<{ $position: 'left' | 'right' }>`
    position: absolute;
    top: 0;
    border-radius: unset;
    border: none;

    ${({ $position }) =>
        $position === 'left'
            ? css`
                  left: 0;
                  background: linear-gradient(
                      90deg,
                      var(--color-background-base) 64.58%,
                      rgba(255, 255, 255, 0) 100%
                  );
              `
            : css`
                  right: 0;
                  background: linear-gradient(
                      270deg,
                      var(--color-background-base) 64.58%,
                      rgba(255, 255, 255, 0) 100%
                  );
              `}

    .dsb_icon,
    .beeline-icons {
        color: var(--color-text-active) !important;
    }
`;

const stepStateStyles = ($state: StepStateType) => {
    switch ($state) {
        case 'success':
            return css`
                color: var(--color-status-success);
            `;
        case 'error':
            return css`
                color: var(--color-status-error);
            `;
        case 'disabled':
            return css`
                color: var(--color-text-disabled);
            `;
        case 'visited':
            return css`
                color: var(--color-text-active);
            `;
        default:
            return css`
                color: var(--color-border);
            `;
    }
};

const orderStateStyles = ($state: StepStateType) => {
    switch ($state) {
        case 'active':
            return css`
                background-color: #fdd835;
            `;
        case 'visited':
            return css`
                border: 1.5px solid var(--color-border-focus);
                background-color: transparent;
            `;
        default:
            return css`
                background-color: transparent;
                border: 1.5px solid var(--color-border);

                .dsb_step-order-number {
                    color: var(--color-text-disabled);
                }
            `;
    }
};

const textStateStyles = ($state: StepStateType) => {
    if ($state === 'disabled') {
        return css`
            color: var(--color-text-disabled);
        `;
    }

    if ($state === 'non-visited') {
        return css`
            color: var(--color-text-inactive);
        `;
    }

    return undefined;
};

export const Step = styled.div<{ $state: StepStateType; $clickable?: boolean }>`
    height: 56px;
    max-height: 56px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    pointer-events: none;

    ${({ $clickable }) =>
        $clickable &&
        css`
            pointer-events: auto;
        `}

    ${({ $state }) =>
        $state === 'disabled' &&
        css`
            cursor: default;
            pointer-events: none;
        `}
`;

export const StepContent = styled.div<{ $direction: StepperDirectionType }>`
    height: 54px;
    max-height: 54px;
    display: flex;
    flex-direction: row;

    ${({ $direction }) =>
        $direction === 'horizontal' &&
        css`
            padding: 0 24px;
        `}
`;

export const StepBorderVertical = styled.hr<{ $activated?: boolean }>`
    width: 2px;
    height: inherit;
    margin: 0 22px 0 0;
    border: 0;
    border-radius: unset;
    background-color: transparent;
    appearance: none;

    ${({ $activated }) =>
        $activated &&
        css`
            border-radius: 0 4px 4px 0;
            background-color: var(--color-text-active);
        `}
`;

export const StepOrder = styled.span<{ $state: StepStateType }>`
    width: 24px;
    min-width: 24px;
    height: 24px;
    min-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 0;
    border-radius: 50%;
    box-sizing: border-box;
    color: var(--color-text-active);

    ${({ $state }) => orderStateStyles($state)}
`;

export const StepIcon = styled.span<{ $state: StepStateType }>`
    margin: auto 0;
    display: flex;

    ${({ $state }) => stepStateStyles($state)}
`;

export const StepBody = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 12px;
    margin-right: 24px;
    padding: 8px 0;
    white-space: nowrap;
`;

export const StepBodyCaption = styled(Typography)<{ $state: StepStateType }>`
    ${({ $state }) => textStateStyles($state)}
`;

export const StepBodyMainTypography = styled(Typography)<{ $state: StepStateType }>`
    ${({ $state }) => textStateStyles($state)}
`;

export const StepBorderHorizontal = styled.hr<{ $activated?: boolean }>`
    width: inherit;
    height: 2px;
    border: 0;
    border-radius: unset;
    background-color: transparent;
    appearance: none;
    margin: 0;

    ${({ $activated }) =>
        $activated &&
        css`
            margin: 0 24px;
            border-radius: 4px 4px 0 0;
            background-color: var(--color-text-active);
        `}
`;

export const MobileStep = styled.div<{ $state: StepStateType; $clickable?: boolean }>`
    display: flex;
    flex-direction: column;
    max-width: 40px;
    cursor: pointer;
    pointer-events: none;

    ${({ $clickable }) =>
        $clickable &&
        css`
            pointer-events: auto;
        `}

    ${({ $state }) =>
        $state === 'disabled' &&
        css`
            cursor: default;
            pointer-events: none;
        `}
`;

export const MobileStepBorder = styled.div<{ $activated?: boolean }>`
    width: auto;
    height: 4px;
    margin-bottom: 11px;
    border-radius: 0 0 4px 4px;
    background-color: transparent;

    ${({ $activated }) =>
        $activated &&
        css`
            background-color: var(--color-text-active);
        `}
`;

export const MobileStepOrder = styled.div<{ $state: StepStateType }>`
    width: 24px;
    min-width: 24px;
    height: 24px;
    min-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: #fdd835;
    color: var(--color-text-active);

    ${({ $state }) =>
        $state === 'visited' &&
        css`
            border: 1.5px solid var(--color-border-focus);
            background-color: transparent;
        `}

    ${({ $state }) =>
        $state === 'non-visited' &&
        css`
            border: 1.5px solid var(--color-border);
            background-color: transparent;

            .dsb_mobile-step-order-number {
                color: var(--color-text-disabled);
            }
        `}
`;

export const MobileStepIcon = styled.span<{ $state: StepStateType }>`
    margin: 0 8px;
    display: flex;

    ${({ $state }) => stepStateStyles($state)}
`;
