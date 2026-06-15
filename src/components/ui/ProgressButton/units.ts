import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '../Button';
import type { ButtonSizeVariants, ResolvedButtonVariant } from '../Button/types';

import type {
    ProgressContentProps,
    ProgressStatusIconProps,
    ProgressStatusProps,
    ProgressSvgPathProps,
    StyledProgressButtonProps,
} from './types';

const strokeRotate = keyframes`
    0% {
        stroke-dasharray: 10 90;
        stroke-dashoffset: 90;
    }
    45% {
        stroke-dasharray: 25 75;
    }
    100% {
        stroke-dasharray: 10 90;
        stroke-dashoffset: -10;
    }
`;

const loadingVariantStyles: Partial<Record<ResolvedButtonVariant, ReturnType<typeof css>>> = {
    contained: css`
        opacity: 1;
        background-color: rgba(253, 216, 53, 0.48);
        border-color: transparent;
    `,
    overlay: css`
        background-color: color-mix(
            in srgb,
            var(--color-button-overlay-background) 48%,
            transparent
        );
        border-color: transparent;
    `,
    danger: css`
        background-color: var(--color-status-error);
        border-color: transparent;
        opacity: 0.48;
    `,
    'accent-black': css`
        background-color: rgba(9, 11, 22, 0.94);
        border-color: transparent;
        opacity: 0.48;
    `,
    'accent-white': css`
        background-color: #ffffff;
        border-color: transparent;
        opacity: 0.48;
    `,
};

const iconSizeClassName: Record<ButtonSizeVariants, string> = {
    small: 'dsb_icon--medium',
    medium: 'dsb_icon--medium',
    large: 'dsb_icon--large',
};

export const ProgressButtonRoot = styled(Button)<StyledProgressButtonProps>`
    position: relative;
    overflow: hidden;

    ${({ $loadingState, $variant }) =>
        $loadingState === 'loading' &&
        loadingVariantStyles[$variant] &&
        css`
            &.dsb-button-progress--loading {
                ${loadingVariantStyles[$variant]}
            }
        `}

    &.dsb-button-progress--success .dsb_icon {
        color: rgba(9, 11, 22, 0.94);
    }

    &.dsb-button-progress--error {
        background-color: var(--color-control-background-error);
        border: 1px solid var(--color-border-error);

        &:hover:not(:disabled) {
            background-color: color-mix(in srgb, var(--color-status-error) 14%, transparent);
            border: 1px solid var(--color-border-error);
        }

        &:hover:active:not(:disabled) {
            background-color: color-mix(in srgb, var(--color-status-error) 18%, transparent);
        }

        .dsb_icon {
            color: var(--color-status-error);
        }
    }
`;

export const Status = styled.div<ProgressStatusProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 0.3s;
`;

export const StatusIcon = styled.span<ProgressStatusIconProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &.dsb_icon {
        color: inherit;
    }
`;

export const getStatusIconClassName = ($size: ButtonSizeVariants): string =>
    ['beeline-icons', 'dsb_icon', iconSizeClassName[$size], 'dsb-button-progress__status'].join(
        ' ',
    );

export const Content = styled.span<ProgressContentProps>`
    transition: opacity 0.3s;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
`;

export const StartIcon = styled.div`
    display: flex;
`;

export const EndIcon = styled.div`
    display: flex;
`;

export const ProgressSvg = styled.svg`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

export const ProgressSvgPath = styled.path<ProgressSvgPathProps>`
    fill: transparent;
    stroke-width: 3;
    transition: stroke-dashoffset 0ms linear;

    &.dsb-button-progress__svg-path--default {
        opacity: 0;
    }

    &.dsb-button-progress__svg-path--loading {
        opacity: 1;
        transition: stroke-dashoffset 300ms linear;
    }

    &.dsb-button-progress__svg-path--error {
        stroke-dashoffset: 0;
        stroke: var(--color-status-error);
        stroke-width: 2;
    }

    &.dsb-button-progress__svg-path--success {
        stroke: transparent;
    }

    ${({ $isIndeterminateLoading }) =>
        $isIndeterminateLoading &&
        css`
            &.dsb-button-progress__svg-path--indeterminate-loading {
                stroke-dasharray: 10 90;
                animation: ${strokeRotate} 1500ms cubic-bezier(0.29, 0.14, 0.28, 0.95) infinite;
            }
        `}
`;
