import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { ColorTypes } from '../types';

import type { AvatarSize, AvatarVariantType, StyledAvatarProps } from './types';

const sizeStyles: Record<AvatarSize, ReturnType<typeof css>> = {
    small: css`
        width: 20px;
        min-width: 20px;
        max-width: 20px;
        height: 20px;
        min-height: 20px;
        max-height: 20px;
    `,
    medium: css`
        width: 40px;
        min-width: 40px;
        max-width: 40px;
        height: 40px;
        min-height: 40px;
        max-height: 40px;
    `,
};

const variantStyles = ($size: AvatarSize, $variant: AvatarVariantType) => {
    if ($variant === 'circle') {
        return css`
            border-radius: 50%;
        `;
    }

    return css`
        border-radius: ${$size === 'small' ? '6px' : '12px'};
    `;
};

const colorStyles: Record<ColorTypes, ReturnType<typeof css>> = {
    grey: css`
        background-color: var(--color-status-neutral-background);

        .avatar__icon,
        .avatar__title {
            color: var(--color-status-neutral);
        }
    `,
    red: css`
        background-color: var(--color-status-error-background);

        .avatar__icon,
        .avatar__title {
            color: var(--color-status-error);
        }
    `,
    orange: css`
        background-color: var(--color-status-warning-background);

        .avatar__icon,
        .avatar__title {
            color: var(--color-status-warning);
        }
    `,
    green: css`
        background-color: var(--color-status-success-background);

        .avatar__icon,
        .avatar__title {
            color: var(--color-status-success);
        }
    `,
    blue: css`
        background-color: var(--color-status-info-background);

        .avatar__icon,
        .avatar__title {
            color: var(--color-status-info);
        }
    `,
    purple: css`
        background-color: var(--color-accent-purple-background);

        .avatar__icon,
        .avatar__title {
            color: var(--color-accent-purple);
        }
    `,
    teal: css`
        background-color: var(--color-accent-teal-background);

        .avatar__icon,
        .avatar__title {
            color: var(--color-accent-teal);
        }
    `,
    magenta: css`
        background-color: var(--color-accent-magenta-background);

        .avatar__icon,
        .avatar__title {
            color: var(--color-accent-magenta);
        }
    `,
};

const hoverToCircleStyles = css`
    &.avatar--hover-to-circle {
        transition: border-radius 0.2s ease;

        .avatar__img {
            transition: border-radius 0.2s ease;
        }

        &:hover {
            border-radius: 50% !important;

            .avatar__img {
                border-radius: 50% !important;
            }
        }
    }
`;

export const StyledAvatar = styled.span<StyledAvatarProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    ${({ $size }) => sizeStyles[$size]}
    ${({ $size, $variant }) => variantStyles($size, $variant)}
    ${({ $color }) => colorStyles[$color]}
    ${({ $clickable }) =>
        $clickable &&
        css`
            cursor: pointer;
        `}
    ${({ $hoverToCircle, $variant }) =>
        $hoverToCircle && $variant === 'square' && hoverToCircleStyles}
`;

export const AvatarIcon = styled.span`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    color: inherit;

    .dsb_icon,
    .beeline-icons {
        color: currentColor !important;
        width: 20px !important;
        height: 20px !important;
        font-size: 20px !important;
        line-height: 20px !important;
    }
`;

export const AvatarTitle = styled.span`
    text-align: center;
    margin: 0;
    padding: 0;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.2px;
`;

const imageSizeStyles: Record<AvatarSize, ReturnType<typeof css>> = {
    small: css`
        width: 20px;
        min-width: 20px;
        max-width: 20px;
        height: 20px;
        min-height: 20px;
        max-height: 20px;
    `,
    medium: css`
        width: 40px;
        min-width: 40px;
        max-width: 40px;
        height: 40px;
        min-height: 40px;
        max-height: 40px;
    `,
};

const imageVariantStyles = ($size: AvatarSize, $variant: AvatarVariantType) => {
    if ($variant === 'circle') {
        return css`
            border-radius: 50%;
        `;
    }

    return css`
        border-radius: ${$size === 'small' ? '6px' : '12px'};
    `;
};

export const AvatarImage = styled.img<{ $size: AvatarSize; $variant: AvatarVariantType }>`
    object-fit: cover;
    ${({ $size }) => imageSizeStyles[$size]}
    ${({ $size, $variant }) => imageVariantStyles($size, $variant)}
`;
