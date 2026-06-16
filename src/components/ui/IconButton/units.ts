import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { ButtonSizeVariants } from '../Button/types';

import type { IconButtonVariant, StyledIconButtonProps } from './types';

const baseButtonStyles = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    outline: none;
    cursor: pointer;
    transition: all 125ms cubic-bezier(0, 0, 0.2, 1);
    box-sizing: border-box;
    text-decoration: none;
    border: 1px solid transparent;
    padding: 0;
    background: transparent;
    font-family: inherit;

    &:disabled {
        cursor: auto;
        opacity: 0.48;
        user-select: none;
        pointer-events: none;
    }
`;

const plainSizes: Record<ButtonSizeVariants, ReturnType<typeof css>> = {
    small: css`
        width: 18px;
        height: 18px;
        min-height: 18px;
    `,
    medium: css`
        width: 20px;
        height: 20px;
        min-height: 20px;
    `,
    large: css`
        width: 24px;
        height: 24px;
        min-height: 24px;
    `,
};

const buttonIconSizes: Record<ButtonSizeVariants, ReturnType<typeof css>> = {
    small: css`
        width: 40px;
        height: 40px;
        min-height: 40px;
    `,
    medium: css`
        width: 48px;
        height: 48px;
        min-height: 48px;
    `,
    large: css`
        width: 56px;
        height: 56px;
        min-height: 56px;
    `,
};

const iconColorStyles = css`
    .dsb_icon,
    .beeline-icons {
        margin: 0;
    }
`;

const plainVariantStyles = css`
    border-radius: 4px;
    background-color: transparent;

    .dsb_icon,
    .beeline-icons {
        color: var(--color-text-inactive) !important;
    }

    &:not(:disabled):hover,
    &:not(:disabled):active,
    &:not(:disabled):focus-visible {
        background-color: transparent;
        border-color: transparent;
    }

    &:not(:disabled):hover .dsb_icon,
    &:not(:disabled):hover .beeline-icons,
    &:not(:disabled):active .dsb_icon,
    &:not(:disabled):active .beeline-icons,
    &:not(:disabled):focus-visible .dsb_icon,
    &:not(:disabled):focus-visible .beeline-icons {
        color: var(--color-text-active) !important;
    }

    &:not(:disabled):focus-visible {
        border-color: var(--color-border-focus, var(--color-border-focused));
    }

    &:disabled .dsb_icon,
    &:disabled .beeline-icons {
        color: var(--color-text-active) !important;
    }
`;

const baseVariantStyles = css`
    border-radius: 12px;
    background: var(--color-background-low);
    border: none;

    .dsb_icon,
    .beeline-icons {
        color: var(--color-text-active) !important;
    }

    &:not(:disabled):hover {
        background: var(--color-control-background-hover);
    }

    &:not(:disabled):active {
        background: var(--color-control-background-pressed);
    }

    &:not(:disabled):focus-visible {
        border: 1px solid var(--color-border-focus, var(--color-border-focused)) !important;
    }
`;

const outlinedVariantStyles = css`
    border-radius: 12px;
    color: var(--color-text-active);
    background-color: transparent;
    border: 1px solid var(--color-border);

    .dsb_icon,
    .beeline-icons {
        color: var(--color-text-active) !important;
    }

    &:not(:disabled):hover {
        background-color: var(--color-background-base-hover);
    }

    &:not(:disabled):focus-visible {
        background-color: transparent;
        border-color: var(--color-border-focused);
    }

    &:not(:disabled):active {
        background-color: var(--color-background-base-pressed);
    }
`;

const overlayVariantStyles = css`
    border-radius: 12px;
    color: var(--color-text-active-inverse);
    background-color: var(--color-button-overlay-background);
    border: 1px solid var(--color-button-overlay-background);

    .dsb_icon,
    .beeline-icons {
        color: var(--color-text-active-inverse) !important;
    }

    &:not(:disabled):hover {
        background-color: var(--color-button-overlay-background-hover);
        border-color: var(--color-button-overlay-background-hover);
    }

    &:not(:disabled):focus-visible {
        background-color: var(--color-button-overlay-background);
        border-color: var(--color-border-focused);
    }

    &:not(:disabled):active {
        background-color: var(--color-button-overlay-background-pressed);
        border-color: var(--color-button-overlay-background-pressed);
    }
`;

const variantStyles: Record<IconButtonVariant, ReturnType<typeof css>> = {
    plain: plainVariantStyles,
    base: baseVariantStyles,
    outlined: outlinedVariantStyles,
    overlay: overlayVariantStyles,
};

const iconButtonStyles = ({ $size, $variant }: StyledIconButtonProps) => css`
    ${baseButtonStyles}
    ${iconColorStyles}
    ${variantStyles[$variant]}
    ${$variant === 'plain' ? plainSizes[$size] : buttonIconSizes[$size]}
`;

export const StyledIconButton = styled.button<StyledIconButtonProps>`
    ${iconButtonStyles}
`;

export const StyledIconAnchor = styled.a<StyledIconButtonProps>`
    ${iconButtonStyles}
`;
