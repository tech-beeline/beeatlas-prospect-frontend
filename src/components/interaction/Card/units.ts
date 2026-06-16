import { css } from '@emotion/react';
import styled from '@emotion/styled';

import card1 from './images/card-1.png';
import card2 from './images/card-2.png';
import card3 from './images/card-3.png';

import { cardVariantToBackgroundColorMap } from './const';
import { CardVariant } from './types';

export const TitleWrapper = styled.div<{ withImage: boolean }>`
    display: flex;
    align-items: center;

    margin-bottom: 16px;

    & > .dsb_icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        font-size: 32px;
        line-height: 32px;

        padding-bottom: ${({ withImage }) => (withImage ? '8px' : '16px')};

        opacity: 0;

        transition: all 0.25s ease-out;
    }

    &:hover > .dsb_icon {
        transform: translateX(18px);

        opacity: 1;
    }

    &:hover > * {
        color: var(--color-text-link);
    }

    cursor: pointer;
`;

export const Title = styled.h4<{ withImage: boolean }>`
    ${({ withImage }) =>
        withImage
            ? css`
                  font-weight: var(--font-weight-medium);
                  font-size: var(--font-size-h2);
                  line-height: var(--font-line-height-h2);
              `
            : css`
                  font-weight: var(--font-weight-medium);
                  font-size: var(--font-size-h4);
                  line-height: var(--font-line-height-h4);
              `}

    transition: all 0.25s ease-out;
`;

export const Card = styled.div<{ withImage?: boolean; variant: CardVariant }>`
    position: relative;

    min-width: ${({ withImage }) => (withImage ? '612px' : '100%')};
    width: ${({ withImage }) => (withImage ? '612px' : '100%')};
    height: ${({ withImage }) => (withImage ? '300px' : '192px')};
    padding: 32px;
    margin-right: 24px;

    border-radius: var(--size-border-radius-x6);

    color: var(--color-text-active);
    background-color: ${({ variant }) => cardVariantToBackgroundColorMap[variant]};

    transition: all 0.25s ease-out;

    cursor: ${({ withImage }) => !withImage && 'pointer'};

    &:hover {
        border-radius: var(--size-border-radius-x12);

        /* ${Title} {
            color: var(--color-text-link);

            &::after {
                transform: translateX(24px);

                opacity: 1;
            }
        } */
    }

    &::before {
        position: absolute;
        top: -61px;
        right: -25px;

        content: ${({ variant, withImage }) =>
            withImage &&
            (variant === CardVariant.LEMON
                ? `url(${card1})`
                : variant === CardVariant.MAGENTA
                ? `url(${card2})`
                : variant === CardVariant.TEAL
                ? `url(${card3})`
                : 'null')};
    }
`;

export const Text = styled.p<{ withImage: boolean }>`
    display: inline-block;

    width: ${({ withImage }) => (withImage ? '340px' : '100%')};

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);
    letter-spacing: var(--font-letter-spacing-body3);

    ${({ withImage }) =>
        !withImage &&
        css`
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            line-clamp: 4;
            -webkit-box-orient: vertical;
        `}
`;
