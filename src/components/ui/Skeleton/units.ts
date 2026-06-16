import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledSkeletonProps } from './types';

const waveAnimation = keyframes`
    0% {
        left: 0;
        transform: translateX(-100%);
    }

    100% {
        left: 100%;
        transform: translateX(0%);
    }
`;

const variantStyles = ({ $variant }: StyledSkeletonProps) => {
    switch ($variant) {
        case 'square':
            return css`
                border-radius: 8px;
                height: 40px;
                width: 40px;
            `;
        case 'circle':
            return css`
                border-radius: 50vh;
                height: 40px;
                width: 40px;
            `;
        case 'title':
            return css`
                height: 16px;
            `;
        case 'line':
            return css`
                border-radius: 8px;
            `;
        default:
            return null;
    }
};

export const StyledSkeleton = styled.div<StyledSkeletonProps>`
    background: var(--color-status-neutral-background);
    border-radius: 2px;
    min-height: 8px;
    overflow: hidden;
    position: relative;
    width: 100%;

    ${({ $animated }) =>
        $animated &&
        css`
            &:after {
                animation: ${waveAnimation} 1.6s linear infinite;
                background: linear-gradient(
                    90deg,
                    transparent,
                    var(--color-background-inverse),
                    transparent
                );
                content: '';
                height: 100%;
                left: 0;
                opacity: 0.08;
                pointer-events: none;
                position: absolute;
                top: 0;
                width: 100%;
            }
        `}

    ${({ $animated }) =>
        !$animated &&
        css`
            &:after {
                display: none;
            }
        `}

    ${variantStyles}
`;
