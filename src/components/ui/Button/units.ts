import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ButtonSizeVariants, ResolvedButtonVariant, StyledButtonProps } from './types';

const baseStyles = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    outline: none;
    cursor: pointer;
    transition: all 125ms cubic-bezier(0, 0, 0.2, 1);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border-radius: 12px;
    white-space: nowrap;
    text-decoration: none;
    box-sizing: border-box;

    &:disabled {
        cursor: auto;
        opacity: 0.48;
        user-select: none;
        pointer-events: none;
    }
`;

const sizeStyles: Record<ButtonSizeVariants, ReturnType<typeof css>> = {
    small: css`
        min-height: 40px;
        padding: 0 16px;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        letter-spacing: 0.2px;
    `,
    medium: css`
        min-height: 48px;
        padding: 0 20px;
        font-weight: 500;
        font-size: 17px;
        line-height: 22px;
        letter-spacing: 0.2px;
    `,
    large: css`
        min-height: 56px;
        padding: 0 22px;
        font-weight: 500;
        font-size: 19px;
        line-height: 24px;
        letter-spacing: 0.2px;
    `,
};

const buttonIconStyles = css`
    flex-shrink: 0;
    align-items: center;
    color: inherit;
    height: 18px;
    width: 18px;

    .dsb_icon,
    .beeline-icons {
        color: currentColor !important;
        width: 18px !important;
        height: 18px !important;
        font-size: 18px !important;
        line-height: 18px !important;
    }
`;

const variantStyles: Record<ResolvedButtonVariant, ReturnType<typeof css>> = {
    contained: css`
        box-shadow: none;
        color: var(--color-text-black-active, rgba(9, 11, 22, 0.94));
        background-color: var(--color-background-brand);
        border: 1px solid var(--color-background-brand);

        &:not(:disabled):hover {
            background-color: var(--color-background-brand-hover);
            border-color: var(--color-background-brand-hover);
        }

        &:not(:disabled):focus-visible {
            background-color: var(--color-background-brand);
            border-color: var(--color-border-focused);
        }

        &:not(:disabled):hover:active {
            background-color: var(--color-background-brand-pressed);
            border-color: var(--color-background-brand-pressed);
        }
    `,
    outlined: css`
        box-shadow: none;
        color: var(--color-text-active);
        background-color: transparent;
        border: 1px solid var(--color-border);

        &:not(:disabled):hover {
            background-color: var(--color-background-base-hover);
        }

        &:not(:disabled):focus-visible {
            background-color: transparent;
            border-color: var(--color-border-focused);
        }

        &:not(:disabled):hover:active {
            background-color: var(--color-background-base-pressed);
        }
    `,
    plain: css`
        color: var(--color-button-plain);
        background-color: transparent;
        border: 1px solid transparent;

        &:not(:disabled):hover {
            box-shadow: none;
            background-color: var(--color-button-plain-background-hover);
        }

        &:not(:disabled):focus-visible {
            box-shadow: none;
            background-color: transparent;
            border-color: var(--color-border-focused);
        }

        &:not(:disabled):hover:active {
            background-color: var(--color-button-plain-background-pressed);
        }
    `,
    overlay: css`
        color: var(--color-text-active-inverse);
        background-color: var(--color-button-overlay-background);
        border: 1px solid var(--color-button-overlay-background);

        &:not(:disabled):hover,
        &:not(:disabled):hover:not(:active) {
            box-shadow: none;
            background-color: var(--color-button-overlay-background-hover);
        }

        &:not(:disabled):focus-visible {
            box-shadow: none;
            background-color: var(--color-button-overlay-background);
            border-color: var(--color-border-focused);
        }

        &:not(:disabled):hover:active {
            background-color: var(--color-button-overlay-background-pressed);
        }
    `,
    danger: css`
        color: var(--color-text-active-inverse);
        background-color: var(--color-status-error);
        border: 1px solid var(--color-status-error);

        &:not(:disabled):hover {
            background-color: var(--color-status-error);
            border-color: var(--color-status-error);
            box-shadow: inset 0 0 0 100px rgba(0, 0, 0, 0.08);
        }

        &:not(:disabled):focus-visible {
            background-color: var(--color-status-error);
            border-color: var(--color-border-focused);
        }

        &:not(:disabled):hover:active {
            background-color: var(--color-status-error);
            border-color: var(--color-status-error);
            box-shadow: inset 0 0 0 100px rgba(0, 0, 0, 0.12);
        }
    `,
    'accent-black': css`
        color: #ffffff;
        background-color: rgba(9, 11, 22, 0.94);
        border: 1px solid rgba(9, 11, 22, 0.94);

        &:not(:disabled):hover {
            background-color: rgba(9, 11, 22, 0.94);
            border-color: rgba(9, 11, 22, 0.94);
            box-shadow: inset 0 0 0 100px rgba(255, 255, 255, 0.08);
        }

        &:not(:disabled):focus-visible {
            background-color: rgba(9, 11, 22, 0.94);
            border-color: var(--color-border-focused);
        }

        &:not(:disabled):hover:active {
            background-color: rgba(9, 11, 22, 0.94);
            border-color: rgba(9, 11, 22, 0.94);
            box-shadow: inset 0 0 0 100px rgba(255, 255, 255, 0.12);
        }
    `,
    'accent-white': css`
        color: rgba(9, 11, 22, 0.94);
        background-color: #ffffff;
        border: 1px solid transparent;

        &:not(:disabled):hover {
            background-color: #ffffff;
            box-shadow: inset 0 0 0 100px rgba(0, 0, 0, 0.04);
        }

        &:not(:disabled):focus-visible {
            background-color: #ffffff;
            border-color: var(--color-border-focused);
        }

        &:not(:disabled):hover:active {
            background-color: #ffffff;
            box-shadow: inset 0 0 0 100px rgba(0, 0, 0, 0.08);
        }
    `,
};

const getPaddingStyles = ({
    $size,
    $hasStartIcon,
    $hasEndIcon,
    $isIconButton,
}: StyledButtonProps) => {
    if ($isIconButton) {
        const iconButtonWidth: Record<ButtonSizeVariants, string> = {
            small: '40px',
            medium: '48px',
            large: '56px',
        };
        const iconButtonPadding: Record<ButtonSizeVariants, string> = {
            small: '0 11px',
            medium: '0 14px',
            large: '0 16px',
        };

        return css`
            width: ${iconButtonWidth[$size]};
            padding: ${iconButtonPadding[$size]};
        `;
    }

    const paddingMap: Record<
        ButtonSizeVariants,
        { default: string; start: string; end: string; both: string }
    > = {
        small: {
            default: '0 16px',
            start: '0 16px 0 11px',
            end: '0 11px 0 16px',
            both: '0 11px',
        },
        medium: {
            default: '0 20px',
            start: '0 20px 0 14px',
            end: '0 14px 0 20px',
            both: '0 14px',
        },
        large: {
            default: '0 22px',
            start: '0 22px 0 16px',
            end: '0 16px 0 22px',
            both: '0 16px',
        },
    };

    const padding =
        $hasStartIcon && $hasEndIcon
            ? paddingMap[$size].both
            : $hasStartIcon
            ? paddingMap[$size].start
            : $hasEndIcon
            ? paddingMap[$size].end
            : paddingMap[$size].default;

    return css`
        padding: ${padding};
    `;
};

const getIconGapStyles = ($size: ButtonSizeVariants) => {
    const gapMap: Record<ButtonSizeVariants, { start: string; end: string }> = {
        small: { start: '6px', end: '6px' },
        medium: { start: '8px', end: '8px' },
        large: { start: '10px', end: '10px' },
    };

    return gapMap[$size];
};

const buttonStyles = (props: StyledButtonProps) => css`
    ${baseStyles}
    ${sizeStyles[props.$size]}
    ${getPaddingStyles(props)}
    ${variantStyles[props.$variant]}
    ${props.$fullWidth &&
    css`
        width: 100%;
    `}
`;

export const StyledButton = styled.button<StyledButtonProps>`
    ${(props) => buttonStyles(props)}
`;

export const StyledAnchor = styled.a<StyledButtonProps>`
    ${(props) => buttonStyles(props)}
`;

export const StartIcon = styled.div<{ $size: ButtonSizeVariants; $isIconButton: boolean }>`
    display: flex;
    margin-right: ${({ $size, $isIconButton }) =>
        $isIconButton ? '0' : getIconGapStyles($size).start};

    ${buttonIconStyles}
`;

export const EndIcon = styled.div<{ $size: ButtonSizeVariants; $isIconButton: boolean }>`
    display: flex;
    margin-left: ${({ $size, $isIconButton }) =>
        $isIconButton ? '0' : getIconGapStyles($size).end};

    ${buttonIconStyles}
`;
